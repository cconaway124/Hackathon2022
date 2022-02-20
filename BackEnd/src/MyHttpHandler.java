import java.io.*;
import com.sun.net.httpserver.*;
import org.apache.commons.text.StringEscapeUtils;

public class MyHttpHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // TODO Auto-generated method stub
        String requestParamValue = null;
        if("GET".equals(exchange.getRequestMethod())) { 
            requestParamValue = handleGetRequest(exchange);
            System.out.println("Get");
        } else if("POST".equals(exchange.getRequestMethod())) { 
            //requestParamValue = handlePostRequest(exchange);
        }
        handleResponse(exchange,requestParamValue);
    }
    private String handleGetRequest(HttpExchange httpExchange) {
                    return httpExchange.
                            getRequestURI()
                            .toString()
                            .split("\\?")[1]
                            .split("=")[1];
    }

   private void handleResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
        OutputStream outputStream = httpExchange.getResponseBody();
        StringBuilder htmlBuilder = new StringBuilder();
        htmlBuilder.append("<html>").
                append("<body>").
                append("<h1>").
                append("Hello ")
                .append(requestParamValue)
                .append("</h1>")
                .append("</body>")
                .append("</html>");
        // encode HTML content 
        String htmlResponse = StringEscapeUtils.escapeHtml4(htmlBuilder.toString());
        // this line is a must
        httpExchange.sendResponseHeaders(200, htmlResponse.length());
        outputStream.write(htmlResponse.getBytes());
        outputStream.flush();
        outputStream.close();
    }
}