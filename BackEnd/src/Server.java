import java.io.*;
import java.net.*;
import com.sun.net.httpserver.*;
import org.json.*;


public class Server {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/posts", new PostsHandler()); //getHttpContext
        server.createContext("/user", new GetHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
        System.out.println("Started");
    }

    static class PostsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String requestParamVal = null;
            if ("POST".equalsIgnoreCase(t.getRequestMethod())) {
                System.out.println("In post");
                requestParamVal = handlePostRequest(t);
            } else {
                requestParamVal = "Not a post";
            }
            handleResponse(t, requestParamVal);
        }

        private String handleGetRequest(HttpExchange t) {
            return t.getRequestURI().toString().split("\\?")[1].split("=")[1];
        }

        private String handlePostRequest(HttpExchange t) {
            InputStream request = t.getRequestBody();
            return new JSONArray(request).toString();
        }

        private void handleResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
                        OutputStream outputStream = httpExchange.getResponseBody();
                        httpExchange.sendResponseHeaders(200, requestParamValue.length());
                        outputStream.write(requestParamValue.getBytes());
                        outputStream.flush();
                        outputStream.close();
                    }
    }

    static class GetHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String requestParamVal = null;
            if ("GET".equalsIgnoreCase(t.getRequestMethod())) {
                System.out.println("In Get");
                requestParamVal = handleGetRequest(t);
                handleResponse(t, requestParamVal);
            } else {
                System.out.println("Not a Get request");
            }
        }

        private String handleGetRequest(HttpExchange t) {
            JSONObject rawJObj = new JSONObject(t.getRequestURI());
            JSONObject request = new JSONObject();
            String query = rawJObj.get("query").toString();
            System.out.println(query);
            String[] firstSplit = query.split("&");
            for (int i = 0; i < firstSplit.length; i++) {
                String[] string = firstSplit[i].split("=");
                request.put(string[0], string[1]);
            }
            System.out.println(request.toString());
            return request.toString();
        }

        private String handlePostRequest(HttpExchange t) {
            InputStream request = t.getRequestBody();
            return new JSONArray(request).toString();
        }

        private void handleResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
                        OutputStream outputStream = httpExchange.getResponseBody();
                        httpExchange.sendResponseHeaders(200, requestParamValue.length());
                        outputStream.write(requestParamValue.getBytes());
                        outputStream.flush();
                        outputStream.close();
                    }
    }
}


