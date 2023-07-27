package com.cricketscore;

import android.content.Context;

import androidx.annotation.NonNull;

import com.cricketscore.util.RandomCollection;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class RandomizerModule extends ReactContextBaseJavaModule {
    private Context _context;

    RandomizerModule(ReactApplicationContext context) {
        super(context);
        this._context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "RandomizerModule";
    }

    @ReactMethod
    public void randomize(ReadableMap probabilities, Promise promise) {
        RandomCollection<String> rc = new RandomCollection<>();
        probabilities
            .getEntryIterator()
            .forEachRemaining(
                stringObjectEntry ->
                    rc.add(
                        (Double) stringObjectEntry.getValue(),
                        stringObjectEntry.getKey()
                    )
            );
        promise.resolve(rc.next());
    }

}
