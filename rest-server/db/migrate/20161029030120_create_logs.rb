class CreateLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :logs do |t|
      t.time :start_time
      t.time :end_time
      t.integer :count

      t.timestamps
    end
  end
end
