# base image
# alpine : 보통 최소화된 이미지 이다... base image를 생성할 때 단순히 build만 해주기 때문에 사용한다..
FROM node:12.2.0-alpine as client
# set working directory
WORKDIR /app
# install and cache app dependencies
# package-lock.json 이 있을 수 있기 때문에 이거랑 package.json 둘다 복사를 해준다.
COPY package*.json /app
RUN yarn
# copy everything
# 로컬에 현재 디렉토리 아래에 있는 모든 것들을 work directory 인 /app 에 모두 복사를 한다.
COPY . .
# build the application
RUN yarn build

# build nginx server 
# pulling nginx image from docker hub
FROM nginx:latest
EXPOSE 80
# copy all the contents from the build directory into the web root
COPY --from=client /app/build /var/www/html
COPY ./default.conf /etc/nginx/conf.d
# start app
# CMD ["npm", "start"]
CMD [ "nginx", "-g", "daemon off;" ]