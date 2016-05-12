class EditMpTableWithLanguages < ActiveRecord::Migration
  def change
    change_table :mps do |t|
      t.string :languages
    end
  end
end
