class EditMpTable < ActiveRecord::Migration
  def change
    change_table :mps do |t|
      
      t.string :name
      t.string :party
      t.string :cons_address
      t.string :cons_phone
      t.string :email
      t.string :photo
      t.integer :riding_id

    end
  end
end
