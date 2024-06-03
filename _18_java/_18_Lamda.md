# Lamda 使用

### 内建函数式接口

> java.lang.function

###### 1. 功能型 Function

>apply()

接收输入和产生输出的类型

``` 
Function<String , String> function = String::toLowerCase;
function.apply("Wdskja")
```

###### 2. 消费型 Consumer

>accept()

``` 
Consumer<String> consumer = System.out::print;
consumer.accept("王欢");
```

###### 3. 供给型 Supplier

>get()

``` 
Supplier<Long> supplier = System::currentTimeMillis;
log.warn("输出:{}" , supplier.get());
```

###### 4. 断言型 Predicate

>test()

``` 
String input = "100";
Predicate<String> predicate = input::endsWith;
log.warn("断言结果:{}" , predicate.test("0"));
```
