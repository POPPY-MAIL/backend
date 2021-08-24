

> 이 포스트는 소셜로그인 구현을 혼자하는 것이 아닌, 프론트엔드와의 역할을 나누어 서로 통신할 때, **백엔드 단**에서 나타날 수 있는 trouble issue에 대해 정리한 글.

> 참조한 다른 블로그들에서 기술되어 있는 내용과 약간 다른 부분들이 있어, 짧은 코드임에도 불구하고, 수많은 오류들과 싸웠기 때문에 기억이 선명할 때 이를 기록하고자 쓰게 되었음.

# 1. 개발 개괄

![img](https://media.vlpt.us/images/dooyeonk/post/675177ad-2af2-42da-aa4a-89758817dd83/social-login-flow.png)

출처 : https://velog.io/@dooyeonk/%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-Django

## 프론트 단에서의 작업

1. 카카오 로그인 버튼을 구현

2. 카카오와 통신하여 `access_token`을 받아오고,

3. 이를 Header에 담아 백엔드(장고)로 보냄. 보내주는 형식은 아래와 같음

   

   ```json
   {
      "access_token":"_u9MlfbNL93m-ahs6YGd8nuQvj495WnXvsTbPwopyWAAAAF7SorJSQ",
      "token_type":"bearer",
      "refresh_token":"eZPG2LoxCEIgQQX6ABxIxQeEiVX7EzQpAwVbUQopyWAAAAF7SorJRw",
      "expires_in":7199,
      "scope":"profile_nickname"
   }
   ```



## 백엔드 단에서의 작업

1. 프론트에서 보내주는 `access_token`을 이용하여 만약 DB에 해당 사용자가 없다면, 카카오에게 사용자 정보를 요청.
2. 카카오가 전달해준 사용자 정보를 이용해 `JWT(Json Web Token)`로 생성하여 프론트에게 넘겨줌.
   - `JWT` : 암호화된 회원정보. 즉, JWT는 일련의 랜덤한 문자열이 아니라 회원정보 그 자체이다. 카카오가 넘겨준 회원정보를 암호화하여 프론트에 전달하는 것.
3. 프론트는 이 jwt로 유저를 식별하게 됨.



# 2. Trouble Issues

포스트맨을 이용하여 Header에 `access_token`을 넣어, (이를테면, Authorization : 4_fq8SUeVUsLDoyUAgRUXdkP80UWq6UO5D9BZQorDR8AAAF7TO-yUQ 같은 식으로) 로컬로 요청을 보내보면서 디버깅 하였다. 맨 처음 작성한 `KakaoLoginView()`에서 어떤 부분이 추가로 수정이 필요한지 서술해본다.

- 약간의 수정이 필요한 `views.py`

  ```python
  ######### trouble0 ##########
  class KakaoLoginView(View):
    ######### trouble1 ##########
      def get(self, request):
          access_token = request.headers["Authorization"]
          headers      =({'Authorization' : f"Bearer {access_token}"})
            ######### trouble2 ##########
          url          = "https://kapi.kakao.com/v1/user/me" 
          response     = requests.request("POST", url, headers=headers) 
          user         = response.json()
  
          if User.objects.filter(social_login_id = user['id']).exists(): # DB에 회원이 있는지 확인
              user_info          = User.objects.get(social_login_id=user['id'])
              ######### trouble3 ##########
              encoded_jwt        = jwt.encode({'id': user_info.id}, wef_key, algorithm='HS256') # jwt토큰 발행
              
  						
              return JsonResponse({ #jwt토큰, 이름, 타입 프론트엔드에 전달
                  ######### trouble4 ##########
                	'access_token' : encoded_jwt.decode('UTF-8'),
                  'user_name'    : user_info.name,
                  'user_pk'      : user_info.id
              }, status = 200)            
          
          else:
              new_user_info = User(
                	######### trouble5 ##########
                  id							= user['id'],
                  name						= user['properties']['nickname'],
                  email           = user['properties'].get('email', None)
              )
              new_user_info.save()
              
              ######### trouble6 ##########
              encoded_jwt         = jwt.encode({'id': new_user_info.id}, some_key, algorithm='HS256') # jwt토큰 발행
              none_member_type    = 1
              return JsonResponse({
                  'access_token' : encoded_jwt.decode('UTF-8'),
                  'user_name'    : new_user_info.name,
                  'user_pk'      : new_user_info.id,
                  }, status = 200)
  ```

  

- `trouble1` : `get`

  - 보안 issue에서 `get` 방식 보다는 `post` 요청이 좀 더 안전하다고 하여, `def post`로 변경



- `trouble2` : `v1`
  - 카카오가 제공하는 `v1` 사용자 정보요청 API는 2020년 8월 10일 부로 서비스가 종료되었다.
  - `v2/user/me` 로 변경



- `trouble3` : `jwt.encode()`

  - ```shell
    JWT: 'module' object has no attribute 'encode'
    ```

    위와 같은 에러 발생!

  - 이유 : 해당 프로젝트에서 jwt 관련하여 2개의 라이브러리가 작동한 것이었는데 하나가 jwt 였고, 다른 하나가 Pyjwt 였다. 서로 다른 2개의 라이브러리가 1개의 모듈에 접근하다보니, 이를 정상적으로 수행하지 못하는 문제였다.

    (Unfortunately, no. As of now both libraries use the same jwt module namespace and Python's module system cannot resolve import jwt deterministically. - 출처 : https://stackoverflow.com/questions/33198428/jwt-module-object-has-no-attribute-encode)

  - 해결 : 2개의 라이브러리를 삭제하고, 1개의 라이브러리만 남긴다.

    ```shell
    pip uninstall jwt
    pip uninstall PyJWT
    pip install PyJWT
    ```

    

- `trouble4` : `encoded_jwt.decode('UTF-8')`

  - ```shell
    AttributeError: 'str' object has no attribute 'decode'
    ```

    위와 같은 에러 발생!

  - 이유 : `decode()`는 암호화된 객체에 적용되어 유니코드 객체를 얻는 함수이다. 이를 문자열에 적용하여 문제가 된 것.

  - 해결 : Python 3부터 모든 문자열은 유니 코드 객체이므로 `decode()`를 적용할 필요가 없다. 그냥 `encoded_jwt.decode()`가 아닌 그냥 `encoded_jwt`만 남긴다.

  

- `trouble5` : 

  - ```shell
    KeyError: 'properties'
    ```

    위와 같은 에러 발생!

  - 이유 :

    프론트에서 넘긴 access_token으로 부터 얻어진 user 회원정보에 `properties`라는 속성이 없는 것이다. 카카오로부터 유저 정보가 아래와 같이 넘어오길 기대하는 것인데..

    ```json
    {
       "id":1852111710,
       "connected_at":"2021-08-15T19:18:04Z",
       "properties":{
          "nickname":"김주호"
       },
       "kakao_account":{
          "profile_nickname_needs_agreement":false,
          "profile_imageeds_agreement":false,
          "profile":{
             "nickname":"김주호",
             "thumbnail_image_url":"http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
             "profiimage_url":"http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
             "is_default_image":true
          }
       }
    }
    ```

    아래처럼 넘어오는 것이다.

    ```json
    {
       "id":1852111710,
       "connected_at":"2021-08-15T19:18:04Z"
    }
    ```

    이는 카카오 디벨로퍼에서 해결해야하는 문제이다. 카카오에게 유저의 정보를 얼마만큼이나 요청할 것이냐에대한 설정을 해줘야한다. 유저의 정보를 조금만 받겠다는 설정이 디폴트로 되어있어서 아래와 같이 적은 정보만 넘어오게 된 것이다.

    

  - 해결 :

    아래의 절차 중 3번을 해줘야한다. (출처 : https://phin09.tistory.com/76)

    1. kakao developers에 로그인 한 뒤 앱을 생성한다.
    2. 이 앱 메뉴에서 kakao login에 들어간 뒤 state를 ON으로 설정한다. Platform 부분에 redirect URI를 준다.

    3. consent items(메뉴 중 kakao login 바로 아래)에서 사용자에게 요청할 정보를 설정한다. 여기서 profile info(nivckname, profile image)만 필수사항으로 바로 설정할 수 있다. 그 외는 선택정보로 설정할 수 있거나, 카카오의 리뷰가 필요하거나 인가되지 않았다.

    consent items에서 profile info를 필수로, email을 선택으로 설정한 뒤 프론트 단에서 사용자가 로그인하면 카카오로부터 사용자 정보에 접근할 수 있는 토큰을 받을 수 있다. 

- `trouble6` : `some_key`

  - jwt를 생성하는 pivot 역할을 하는 key(문자열)를 인자로 주어야한다.
  - 절대로 외부에 노출되어서는 안된다.
  - 해결 : `settings.py`에 있는 `SECRET_KEY`를 할당하였다. `SECRET_KEY`는 `environ` 라이브러리를 이용하여 `.env`에 숨겨 분리하였음.

  

- `trouble0` : `CSRF issue`

  - [CSRF(Cross-site Request Forgery, 크로스사이트 요청 위조)](http://ko.wikipedia.org/wiki/사이트_간_요청_위조) 공격은 원클릭 공격, 사이드 재킹, 세션 라이딩 등으로도 알려져 있고, 약어로는 XSRF로도 알려져 있다. 이 공격은 사이트가 신뢰하는 사용자를 통해 공격자가 원하는 명령을 사이트로 전송하는 기법을 사용. 공격이 사용자를 통해 이루어지기 때문에 공격자의 IP는 추적 불가능한 특성이 있다. (출처 : https://www.insilicogen.com/blog/55)

  - 위 공격에 대비하여 장고는 모든 `POST` 방식의 폼 전송에 hidden 필드로 세션에 따른 임의 키값을 전송하며, 해당 키 값이 유효한지를 매번 확인한다.

  - 만약, 해당 view에 `CSRF`를 적용하고 싶지 않다면, `decorator`를 사용하면 된다.

    ```python
    @method_decorator(csrf_exempt, name='dispatch')
    class KakaoLoginView(View):
      	pass
    ```



# 3. 최종

- 수정이 완료된 `views.py`

```python
import jwt
import requests
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from BACKEND.settings import SECRET_KEY
from accountapp.models import AppUser


@method_decorator(csrf_exempt, name='dispatch')
class KakaoLoginView(View):  # 카카오 로그인
    def post(self, request):
        access_token = request.headers["Authorization"]
        headers = ({'Authorization': f"Bearer {access_token}"})
        url = "https://kapi.kakao.com/v2/user/me"  
        response = requests.request("POST", url, headers=headers)  # API를 요청하여 회원의 정보를 response에 저장
        user = response.json()

        if AppUser.objects.filter(id=user['id']).exists():  # 기존에 소셜로그인을 했었는지 확인
            user_info = AppUser.objects.get(id=user['id'])

            encoded_jwt = jwt.encode({'id': user_info.id}, SECRET_KEY, algorithm='HS256')  # jwt토큰 발행
            return JsonResponse({  # jwt토큰, 이름, 타입 프론트엔드에 전달
                'access_token': encoded_jwt,
                'user_name': user_info.name,
                'user_pk': user_info.id
            }, status=200)

        else:
            new_user_info = AppUser(
                id=user['id'],
                name=user['properties']['nickname'],
                email=user['properties'].get('email', None)
            )
            new_user_info.save()

            encoded_jwt = jwt.encode({'id': new_user_info.id}, SECRET_KEY, algorithm='HS256')  # jwt토큰 발행
            none_member_type = 1
            return JsonResponse({
                'access_token': encoded_jwt.decode('UTF-8'),
                'user_name': new_user_info.name,
                'user_pk': new_user_info.id,
            }, status=200)

```

