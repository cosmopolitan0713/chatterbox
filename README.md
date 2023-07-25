# DB設計
## usersテーブル
<!-- ユーザー情報 -->
| Column             | Type    | Option                    | 
| ------------------ | ------- | ------------------------- | 
| id(PK)             | integer | null: false               | 
| username           | string  | null: false               | 
| encrypted_password | string  | null: false               | 
| email              | string  | null: false, unique: true | 
| date_of_birth      | date    |                           | 
| hobbies_id         | integer |                           | 
| interests_id       | integer |                           | 
| character_id       | integer | null: false               |
| background_id      | integer |                           |

### Association
- has_many :conversations

## conversationsテーブル
<!-- 会話情報 -->
| Column               | Type       | Option                         | 
| -------------------- | ---------- | ------------------------------ | 
| id(PK)               | integer    | null: false                    | 
| content              | text       | null: false                    | 
| chatbot_reply        | text       | null: false                    |
| user(FK)             | references | null: false, foreign_key: true | 
| character_id         | integer    | null: false                    |

### Association
- belongs_to :user
