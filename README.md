# アプリケーション名
## ChatterBox
# アプリケーション概要
対話型エンターテイメントアプリです。  
ユーザーの孤独感の軽減やストレス・不安の緩和、情報提供やアドバイスのニーズを満たすことができます。

# URL
http://13.115.61.143/
# テスト用アカウント
・Basic認証ID：admin  
・Basic認証パスワード：2222  
・メールアドレス：test@gmail.com  
・パスワード：abc123
# 利用方法
ユーザーは新規登録またはログインを行う。  
トップページ下部のテキスト入力欄に入力後送信すると返答がきます。
左側サイドバーの会話履歴を押すことで、履歴を表示できます。  
履歴横のアイコンをクリックすることで会話履歴を削除できます。  
ヘッダーメニューから、マイページ、キャラクター選択、背景選択ページにいつでも遷移することができ、遷移後のページでは、編集や変更をすることが可能になっております。  
各ページには更新ボタンを配置してますので、こちらをクリックすることで変更が完了します。


# アプリケーションを作成した背景
対話とキャラクターの存在を通じて、ユーザーが孤独感を軽減し、ストレスの軽減、
コミュニケーションや情報のニーズを満たすことが出来る環境の提供。
ユーザーの幸福感や心の健康を向上させることを目指し、アプリを作成しました。

# 洗い出した要件
[要件を定義したシート](https://docs.google.com/spreadsheets/d/1g7zEuSl7YuhfsXj078KciEZj-tt8Ld7-uYHaIayl8Z4/edit?usp=sharing)
# 実装した機能についての画像やGIFおよびその説明
## 登録機能
[![Image from Gyazo](https://i.gyazo.com/c4e9e967bdbb36a0f85634dc176e2ca7.png)](https://gyazo.com/c4e9e967bdbb36a0f85634dc176e2ca7)
[![Image from Gyazo](https://i.gyazo.com/8f0bb77ed923172e3c8d0f0418688143.png)](https://gyazo.com/8f0bb77ed923172e3c8d0f0418688143)
[![Image from Gyazo](https://i.gyazo.com/cc71918bb10b6320495189d1ef44f365.png)](https://gyazo.com/cc71918bb10b6320495189d1ef44f365)
## トップページ  
[![Image from Gyazo](https://i.gyazo.com/eb7b37e7c0da9c0f54eedd9bda36c781.jpg)](https://gyazo.com/eb7b37e7c0da9c0f54eedd9bda36c781)  

## 対話機能,音声機能
[![Image from Gyazo](https://i.gyazo.com/38ece61cf6944fdc932783e729815458.jpg)](https://gyazo.com/38ece61cf6944fdc932783e729815458)

## 会話内容の保存
[![Image from Gyazo](https://i.gyazo.com/82ef3c6a3e8b0e2064b4c607efd6c3d8.png)](https://gyazo.com/82ef3c6a3e8b0e2064b4c607efd6c3d8)

## マイページ機能、マイページ編集機能
[![Image from Gyazo](https://i.gyazo.com/7871bb133bc83a30eef98b30b1ca31cf.png)](https://gyazo.com/7871bb133bc83a30eef98b30b1ca31cf)
[![Image from Gyazo](https://i.gyazo.com/82843c34554c88adbb244016c64eee9d.png)](https://gyazo.com/82843c34554c88adbb244016c64eee9d)
## キャラクター変更機能、背景変更機能
[![Image from Gyazo](https://i.gyazo.com/3d08df56d1e874b4fbd6dd93fc905789.png)](https://gyazo.com/3d08df56d1e874b4fbd6dd93fc905789)
[![Image from Gyazo](https://i.gyazo.com/4fc7493a7d8e313df3f9ff4ff719f08c.png)](https://gyazo.com/4fc7493a7d8e313df3f9ff4ff719f08c)
# 実装予定の機能
・パーソナライズ機能
ユーザーの個別の興味や好みに合わせた対話やコンテンツの提供を通じて、よりカスタマイズされた体験を提供すること。  
・音声入力機能
ユーザーがテキストを入力する代わりに音声で対話を行えるようにすること。
# データベース設計
[![Image from Gyazo](https://i.gyazo.com/f6299abddbe1b02c71823611e8190ce5.png)](https://gyazo.com/f6299abddbe1b02c71823611e8190ce5)
# 画面遷移図
[![Image from Gyazo](https://i.gyazo.com/fa7ddbf56cab6f0abb88bdfdc9a831ab.png)](https://gyazo.com/fa7ddbf56cab6f0abb88bdfdc9a831ab)
# 開発環境
使用した言語：html,css,Ruby,JavaScript  
フレームワーク：Ruby on Rails

# ローカルでの動作方法
% git clone https://github.com/cosmopolitan0713/chatterbox.git  
% bundle install

# 工夫したポイント
ユーザーが直感的に操作しやすいように意識しました。  
使いやすくストレスなく操作できるようにしました。
# 改善点
キャラクターに動きがなくどうしても機械的になってしまうので、動的なコンテンツの追加を考えています。
スマホでも操作できるようにする。

# アプリケーションを制作するのにかけた時間
企画  12時間
開発  200時間
## 合計 212時間
