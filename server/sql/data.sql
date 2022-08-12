CREATE TABLE tb_data (
  `seq` INT NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `server_seq` INT NOT NULL  COMMENT '서버 시퀀스',
  `cpu` FLOAT NOT NULL DEFAULT 0 COMMENT 'CPU usage rto',
  `mi01` FLOAT NOT NULL DEFAULT 0 COMMENT 'CPU load average mi01',
  `mi05` FLOAT NOT NULL DEFAULT 0 COMMENT 'CPU load average mi05',
  `mi15` FLOAT NOT NULL DEFAULT 0 COMMENT 'CPU load average mi15',
  `mem` FLOAT NOT NULL DEFAULT 0 COMMENT 'Memory usage rto',
  `swap` FLOAT NOT NULL DEFAULT 0 COMMENT 'Swap Memory usage rto',
  `total_disk` FLOAT NOT NULL DEFAULT 0 COMMENT 'TOTAL DISK usage rto',
  `disk1` FLOAT NOT NULL DEFAULT 0 COMMENT 'xvda1 usage rto',
  `disk2` FLOAT NOT NULL DEFAULT 0 COMMENT 'xvdb1 usage rto',
  `disk3` FLOAT NOT NULL DEFAULT 0 COMMENT 'xvdc1 usage rto',
  `reg_dt` DATETIME NOT NULL DEFAULT NOW() COMMENT '등록일',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;