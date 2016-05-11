class CreateRidings < ActiveRecord::Migration
  def change
    create_table :ridings do |t|
      t.string  :name
      t.integer :mp_id
      t.timestamps
    end
  end
end
