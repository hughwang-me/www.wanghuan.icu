# Lamda 使用

### 数据流处理

##### stream()

> Stream<String> stream = Stream.of("first", "second", "third");

##### map

> List<String> collected = list.stream().map(String::toUpperCase).distinct().collect(Collectors.toList());

##### distinct

##### collect

##### toList

##### reduce

``` 
        int reduce = users.stream().map(user -> {
            log.warn("user id : {} age : {}" , user.getId() , user.getAge());
            int result = user.getId() * user.getAge();
            log.warn("result {}" , result);
            return result;
        }).reduce((a , b ) -> {
            log.warn("a {}", JSON.toJSONString(a));
            log.warn("b {}", JSON.toJSONString(b));
            return a+b;
        }).get();
        log.warn("reduce {}" , reduce);
```
