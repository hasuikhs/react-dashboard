CREATE TABLE tb_data (
  `seq` INT NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `server_seq` INT NOT NULL COMMENT '서버 시퀀스',
  `cpu_usage` TINYINT NOT NULL COMMENT 'CPU usage',
  `load_average_mi01` TINYINT NOT NULL COMMENT 'CPU load average mi01',
  `load_average_mi05` TINYINT NOT NULL COMMENT 'CPU load average mi05',
  `load_average_mi15` TINYINT NOT NULL COMMENT 'CPU load average mi15',
  `memory_usage` TINYINT NOT NULL COMMENT 'Memory usage',
  `swap_memory_usage` TINYINT NOT NULL COMMENT 'Swap Memory usage',
  `disk1` TINYINT NOT NULL COMMENT 'DISK1 usage',
  `disk2` TINYINT NOT NULL COMMENT 'DISK1 usage',
  `reg_dt` DATETIME NOT NULL DEFAULT NOW() COMMENT '등록일',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;