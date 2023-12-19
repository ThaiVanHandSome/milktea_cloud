package hcmute.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySqlTestConnect {
    public static void main(String[] args) {
        String jdbcUrl = "jdbc:mysql://google/milkteadb?cloudSqlInstance=milkteacloud-408213:us-east1:milktea&socketFactory=com.google.cloud.sql.mysql.SocketFactory&useSSL=false";

        String username = "root";
        String password = "123456789";

        try {
            Connection connection = DriverManager.getConnection(jdbcUrl, username, password);
            if (connection != null) {
                System.out.println("Kết nối đến cơ sở dữ liệu thành công!");
                connection.close();
            }
        } catch (SQLException e) {
            System.out.println("Không thể kết nối đến cơ sở dữ liệu: " + e.getMessage());
        }
    }
}
