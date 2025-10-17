#!/bin/bash
DATE=$(date +%F)
BACKUP_DIR="/home/pythagore/infra/backup"
docker exec mariadb mysqldump -u root -psupersecure tournoibabyfoot > $BACKUP_DIR/tournoibabyfoot_$DATE.sql
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -delete
