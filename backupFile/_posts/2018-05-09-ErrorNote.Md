---
layout: post
title: Error Note
categories :
- 개발
- 에러노트
---

### add search on jekyll Site
 > [Read More ](https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/)

---

### C# StringComparison
> `CurrentCulture` 使用区域敏感排序规则和当前区域比较字符串。
`CurrentCultureIgnoreCase` 使用区域敏感排序规则、当前区域来比较字符串，同时忽略被比较字符串的大小写。
`InvariantCulture` 使用区域敏感排序规则和固定区域比较字符串。
`InvariantCultureIgnoreCase` 使用区域敏感排序规则、固定区域来比较字符串，同时忽略被比较字符串的大小写。
Ordinal 使用序号排序规则比较字符串。
`OrdinalIgnoreCase` 使用序号排序规则并忽略被比较字符串的大小写，对字符串进行比较。
```java
String.Equals(str1,str2,StringComparison.CurrentCultureIgnoreCase);
```
[Read More](https://blog.csdn.net/sinat_27657511/article/details/52275327
)

---

### Cross Apply and Outer Apply
[Read More](https://blog.csdn.net/dbagaoshou/article/details/70157019)

---

### 데이터 베이스 호환성 수준이란

SQL Server 2000을 2008로 업그레이드 하였는데 2008의 기능을 사용할 수 없다. 예를들면 roll up?
호환성 수준을 2008에 맞게 설정하면 문제는 해결된다.호환성 수준을 설정하는 방법은 세가지가 있다.

1. 시스템 저장 프로시저로 설정하기
```SQL
sp_dbcmptlevel @dbname = '디비명', @new_cmptlevel = 100
```

2. ALTER 문으로 설정하기
```
 ALTER DATABASE DBNAME
 SET COMPATIBILITY_LEVEL = 100
```

3. UI로 설정하기

![IMAGE](http://cfile5.uf.tistory.com/image/23059E4053EC70A3020484)
COMPATIBILITY_LEVEL { 80 | 90 | 100 | 110 | 120 }

데이터베이스가 호환되도록 설정할 SQL Server의 버전. 값은 다음 중 하나여야 한다.

>80 = SQL Server 2000<br>
90 = SQL Server 2005<br>
100 = SQL Server 2008<br>
110 = SQL Server 2012<br>
120 = SQL Server 2014<br>

[Read More ](http://blog.naver.com/PostView.nhn?blogId=gun0626&logNo=221096650826)

[Read More Sample ](http://nexondbteam.tistory.com/80)

---

### element Ui Guide

[Read More](http://element-cn.eleme.io/#/zh-CN/component/layout)

---

### javascript DateCountDown

{% highlight ruby %}

// Set the date we're counting down to
var countDownDate = new Date("<%=EndDateTime %>").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

// Get todays date and time
var now = new Date().getTime();

// Find the distance between now an the count down date
var distance = countDownDate - now;

// Time calculations for days, hours, minutes and seconds
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);

// Display the result in the element with id="demo"
//document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//+ minutes + "m " + seconds + "s ";
console.log('this ' + countDownDate );
$(".timer_hour").html(hours);
$(".timer_minute").html(minutes);
$(".timer_second").html(seconds);

// If the count down is finished, write some text
if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
}
}, 1000);
{% endhighlight %}


---

### Date on iOS device returns NaN

[read more ](https://stackoverflow.com/questions/26657353/date-on-ios-device-returns-nan/26671796)

---

### Remove Html Tag from String without knowing whick tags are in it

Use Regex
```java
String input_String =
 Regex.Replace(input_Strnig, "<.*?>", String.Empty);
```

### jQuery.post(), Ajax HTTP POST 방식 요청

(Read More)[ http://findfun.tistory.com/400]

---

### asp.net Json flush
```java
string json = "{\"rtnCode\":\"" + strRtn + "\"}";

Response.Clear();
Response.ContentType = "application/json; charset=utf-8";
Response.Write(json);
Response.End();s
```
[Read More](https://www.newtonsoft.com/json/help/html/M_Newtonsoft_Json_JsonWriter_Flush.htm)

---

### [ MSSQL Procedure 변경이력 확인 ]
```sql
SELECT top 10 *
FROM sys.sql_modules sm
inner join sys.all_objects ao
on sm.object_id = ao.object_id
WHERE NAME = 'Input Store Procedure Name'
order by modify_date desc
```

[sys.all_objects](https://docs.microsoft.com/ko-kr/previous-versions/sql/sql-server-2012/ms178618(v=sql.110)   )

[sys.sql_modules](https://docs.microsoft.com/ko-kr/previous-versions/sql/sql-server-2008-r2/ms175081(v=sql.105)    )



------
### [ WebService Get 방식 호출 ]

System.Web.Script.Services
```java
ScriptMethod(UseHttpGet = true)
```
`HTTP GET` 명령을 사용 하 여 호출 하는 경우 false `HTTP POST` 명령을 사용 하 여 메서드를 호출 합니다.

web.config 의 `<system>`에 추가
```xml
<webServices>
     <protocols>
       <add name="HttpGet"/>
       <add name="HttpPost"/>
       <add name="HttpSoap"/>
     </protocols>
   </webServices>
```



[MSDN 더 보기 ](https://msdn.microsoft.com/ko-kr/library/system.web.script.services.scriptmethodattribute.usehttpget(v=vs.110).aspx)

------
### [ Convert return Data to Json Type ]

```java
#region  
        /// <summary>
        ///
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public string ConvertToJson(DataTable dt) {
            /*Convert return Data to Json Type*/
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            return jsSerializer.Serialize(rows);
        }
        #endregion
```

---


### Visual Studio Error
