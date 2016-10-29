module MediaSite
  class API < Grape::API
    version 'v1', using: :path
    format :json
    prefix :api

    resource :logs do
      # descには説明を書く
      desc 'Return public logs.'
      get :public do
        Log.all
      end

      # route_paramを使うとname spaceのように区切れる
      route_param :id do
        desc 'Return a active log'
        get do
          Log.find_by(id: params[:id])
        end
      end

      desc 'Create a Log'
      post do
        Log.create(start_time: Time.now)
      end

      route_param :id do
        desc 'update'
        params do
          # paramsにはそのメソッドで必須なパラメータを書く
          requires :count, type: Integer, desc: 'Log count'
        end
        put do
            Log.find(params[:id]).update(end_time: Time.now, count: params[:count])
        end
      end

      desc 'delete'
      params do
        requires :id, type: Integer, desc: 'Log id'
      end
      delete do
        Log.find(params[:id]).destroy
      end
    end

  end
end