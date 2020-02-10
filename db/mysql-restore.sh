cat backup.sql | docker exec -i $1 /usr/bin/mysql -u root --password=somewordpress wordpress
