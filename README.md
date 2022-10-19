Nest.js Cache Manager + cache-manager-ioredis 연동 예시

실행 순서

1. Redis 컨테이너 실행

```
cd containers
docker-compose up --build
```

2. 의존성 설치

```
yarn install
```

3. 애플리케이션 실행 (개발환경으로)

```
yarn start:dev
```

+) Redis-cache service 테스트 실행

```
yarn test:watch
```
