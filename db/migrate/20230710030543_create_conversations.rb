class CreateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.text       :content,        null: false
      t.references :user,           null: false, foreign_key: true
      t.integer    :character_id,   null: false
      t.timestamps
    end
  end
end
