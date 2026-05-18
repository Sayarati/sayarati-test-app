package online.sayarati.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebChromeClient.FileChooserParams;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import androidx.core.content.FileProvider;

import java.io.File;
import java.io.IOException;

public class MainActivity extends Activity {
    private static final String APP_URL = "https://app.sayarati.online/?android=1";
    private static final int FILE_CHOOSER_REQUEST = 7001;

    private WebView webView;
    private ValueCallback<Uri[]> fileCallback;
    private Uri cameraPhotoUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.parseColor("#090F12"));
        getWindow().setNavigationBarColor(Color.parseColor("#090F12"));

        webView = new WebView(this);
        webView.setLayoutParams(new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        ));
        webView.setBackgroundColor(Color.parseColor("#F6F7F4"));
        setContentView(webView);

        configureWebView();
        webView.loadUrl(APP_URL);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUserAgentString(settings.getUserAgentString() + " SayaratiAndroid/1.0");

        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setWebViewClient(new SayaratiWebViewClient());
        webView.setWebChromeClient(new SayaratiChromeClient());
    }

    private class SayaratiWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return handleExternalUrl(request.getUrl());
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return handleExternalUrl(Uri.parse(url));
        }
    }

    private boolean handleExternalUrl(Uri uri) {
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String url = uri.toString();

        if (scheme.equals("tel") || scheme.equals("mailto") || scheme.equals("whatsapp") || url.contains("wa.me/")) {
            openOutside(url);
            return true;
        }

        return false;
    }

    private void openOutside(String url) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (ActivityNotFoundException ignored) {
            // Keep the user in the app if Android cannot find an app for the link.
        }
    }

    private class SayaratiChromeClient extends WebChromeClient {
        @Override
        public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> callback, FileChooserParams params) {
            if (fileCallback != null) {
                fileCallback.onReceiveValue(null);
            }
            fileCallback = callback;

            Intent contentIntent = new Intent(Intent.ACTION_GET_CONTENT);
            contentIntent.addCategory(Intent.CATEGORY_OPENABLE);
            contentIntent.setType("image/*");

            Intent[] extraIntents = createCameraIntent();
            Intent chooser = new Intent(Intent.ACTION_CHOOSER);
            chooser.putExtra(Intent.EXTRA_INTENT, contentIntent);
            chooser.putExtra(Intent.EXTRA_TITLE, "Select photo");
            chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, extraIntents);

            try {
                startActivityForResult(chooser, FILE_CHOOSER_REQUEST);
            } catch (ActivityNotFoundException error) {
                fileCallback = null;
                return false;
            }
            return true;
        }
    }

    private Intent[] createCameraIntent() {
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (cameraIntent.resolveActivity(getPackageManager()) == null) {
            return new Intent[0];
        }

        try {
            File cameraDir = new File(getCacheDir(), "camera");
            if (!cameraDir.exists()) cameraDir.mkdirs();
            File imageFile = File.createTempFile("sayarati-photo-", ".jpg", cameraDir);
            cameraPhotoUri = FileProvider.getUriForFile(this, getPackageName() + ".fileprovider", imageFile);
            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, cameraPhotoUri);
            cameraIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            return new Intent[]{cameraIntent};
        } catch (IOException error) {
            cameraPhotoUri = null;
            return new Intent[0];
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER_REQUEST || fileCallback == null) return;

        Uri[] results = null;
        if (resultCode == RESULT_OK) {
            if (data != null && data.getData() != null) {
                results = new Uri[]{data.getData()};
            } else if (cameraPhotoUri != null) {
                results = new Uri[]{cameraPhotoUri};
            }
        }

        fileCallback.onReceiveValue(results);
        fileCallback = null;
        cameraPhotoUri = null;
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }
}
