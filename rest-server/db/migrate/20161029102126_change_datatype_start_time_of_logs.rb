class ChangeDatatypeStartTimeOfLogs < ActiveRecord::Migration[5.0]
  def change
    change_column :logs, :start_time, :datetime
  end
end
