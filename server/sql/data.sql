CREATE TABLE tb_data (
  `seq` INT NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `server_seq` INT NOT NULL COMMENT '서버 시퀀스',
  `cpu_usage` TINYINT NOT NULL COMMENT 'CPU usage',
  `load_average` TINYINT NOT NULL COMMENT 'CPU load average',
  `reg_dt` DATETIME NOT NULL DEFAULT '2022-01-01 00:00:00' COMMENT '등록일',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;