class EditRidingsWithSpecialIds < ActiveRecord::Migration
  def change
     change_table :ridings do |t|
      t.string :special_riding_id
      t.string :special_mp_id
    end
  end
end
