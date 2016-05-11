class RemoveMpIdFromRidings < ActiveRecord::Migration
  def change
    remove_column :ridings, :mp_id
  end
end
