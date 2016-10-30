module MediaSite
  class API < Grape::API
    version 'v1', using: :path
    format :json
    prefix :api

    helpers do
      def authenticate_error!
        # 認証が失敗したときのエラー
        h = {'Access-Control-Allow-Origin' => "*", 
             'Access-Control-Request-Method' => %w{GET POST OPTIONS}.join(",")}
        error!('You need to log in to use the app.', 401, h)
      end

      def authenticate_user!
        # header から認証に必要な情報を取得
        uid = request.headers['Uid']
        token = request.headers['Access-Token']
        client = request.headers['Client']
        @user = User.find_by_uid(uid)

        # 認証に失敗したらエラー
        unless @user && @user.valid_token?(token, client)
          authenticate_error!
        end
      end

    end

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
          authenticate_user! 
          Log.find_by(id: params[:id])
        end
      end

      desc 'Create a Log'
      post do
        authenticate_user!
        Log.create(start_time: Time.now)
      end

      route_param :id do
        desc 'update'
        params do
          # paramsにはそのメソッドで必須なパラメータを書く
          requires :count, type: Integer, desc: 'Log count'
        end
        put do
            authenticate_user!
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