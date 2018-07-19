var a = 10;

// navigator.serviceWorker.register('./sw.js')
// .then()
// .catch();

//install
// cache 관련 파일을 저장함.
var CACHE_NAME = 'YOONSUNG\'S CACHE 1';
var filesToCachce = [
    './',
    './app.js',
    './base.css',
    "./img/worldcup.png"

]

console.log(this);

self.addEventListener('install', function(event){
   event.waitUntil(caches.open(CACHE_NAME)
       .then(function(cache){
           return cache.addAll(filesToCachce);
       })
       .catch(function (err) {
           console.error(err);
       })
   );

});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
            .catch(function (err) {
                console.error(err);
            })
    );
});
