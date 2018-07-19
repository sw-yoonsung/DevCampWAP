/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

// 1. 웹 앱 매니페스트 파일 생성
// 2. 서비스 워커 등록
// - UI 초기화 함수
// - 버튼 활성 관련 함수
// - 푸시 구독(등록)
// - 파이어베이스 저장
// - 파이어베이스에 키 저장
// - 서비스워커에 Push Notification 구현
// - 파이어베이스에 저장된 키로 구글 푸시서버에 POST 요청을 보냄
// - 요청의 내용을 구현한 notification에 맞게 표시
// 3. 서비스 워커 설치(캐싱)
// 4. 푸시 알람 기능 구현

// 'use strict';
// var config = {
//     apiKey: "AIzaSyD6YhLPnMec2zgdyDw41T5ulL5niJnEm3o",
//     authDomain: "pwa-push-1c769.firebaseapp.com",
//     databaseURL: "https://pwa-push-1c769.firebaseio.com",
//     projectId: "pwa-push-1c769",
//     storageBucket: "pwa-push-1c769.appspot.com",
//     messagingSenderId: "556857602750"
// };
//
// const applicationServerPublicKey = config.apiKey;

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
        .then(function(swReg) {
            console.log('Service Worker is registered', swReg);

            swRegistration = swReg;
            initialiseUI();
        })
        .catch(function(error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}
function updateBtn() {
    if (Notification.permission === 'denied') {
        pushButton.textContent = 'Push Messaging Blocked.';
        pushButton.disabled = true;
        updateSubscriptionOnServer(null);
        return;
    }

    if (isSubscribed) {
        pushButton.textContent = 'Disable Push Messaging';
    } else {
        pushButton.textContent = 'Enable Push Messaging';
    }

    pushButton.disabled = false;
}

function initialiseUI() {
    pushButton.addEventListener('click', function() {
        pushButton.disabled = true;
        if (isSubscribed) {
            unSubscribeUser();
        } else {
            subscribeUser();
        }
    });


    swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }

            updateBtn();
        });
}
function subscribeUser() {
    swRegistration.pushManager.subscribe({
        // 푸시 수신 시 알람 표시 속성
        userVisibleOnly: true
    })
        .then(function(subscription) {
            console.log('User is subscribed:', subscription);
            isSubscribed = true;

            updateSubscriptionOnServer(subscription);
            updateBtn();
        })
        .catch(function(err) {
            console.log('Failed to subscribe the user: ', err);
            updateBtn();
        });
}

function updateSubscriptionOnServer(subscription, unsubscribed) {
    var subscriptionJson = document.querySelector('.js-subscription-json');
    var subscriptionDetails = document.querySelector('.js-subscription-details');

    if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
        sendDeviceKeytoFirebase(subscription.endpoint.split('send/')[1]);
    } else {
        subscriptionDetails.classList.add('is-invisible');
    }
}
function unSubscribeUser() {
    swRegistration.pushManager.getSubscription().then(function(subscription) {
        subscription.unsubscribe().then(function(successful) {
            console.log('User is unsubscribed : ', successful);
            console.log('Unsubscribed subscription : ', subscription);

            updateSubscriptionOnServer(subscription, successful);
            isSubscribed = false;

            updateBtn();
        }).catch(function(e) {
            console.log('Failed to unsubscribe the user: ', e);
            updateBtn();
        })
    });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
