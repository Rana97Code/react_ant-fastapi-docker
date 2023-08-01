-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 01, 2023 at 11:27 AM
-- Server version: 8.0.21
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fastapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_address` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`, `company_name`, `created_at`) VALUES
(3, 'space x', 'space@twitter.com', '77827339', 'Los Angelious', 'Space X America', NULL),
(4, 'Xens ad', 'xens@email.com', '857554736543', 'Korea', 'Korean Company', NULL),
(5, 'Bill Gates', 'billgates@email.com', '8576364563', 'America', 'Microsoft', NULL),
(15, 'G.P.', 'gp@email.com', '0170000000', 'Bosundhara ', 'Grameen Phone', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mail_contents`
--

CREATE TABLE `mail_contents` (
  `id` int NOT NULL,
  `mail_type` varchar(100) NOT NULL,
  `mail_title` varchar(100) NOT NULL,
  `mail_content` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mail_contents`
--

INSERT INTO `mail_contents` (`id`, `mail_type`, `mail_title`, `mail_content`, `created_at`) VALUES
(16, 'SMS', 'Com', 'This sms content can go', '2023-06-13 05:38:22'),
(17, 'EMAIL', 'Com1', 'This is the email content', '2023-06-13 05:39:06'),
(18, 'SMS', 'Govt', 'This is government declaration about recent situation.', '2023-07-11 09:21:44'),
(26, 'SMS', 'Gov1', 'This is first SMS', '2023-07-20 10:37:19'),
(27, 'EMAIL', 'Com2', 'Is this email', '2023-07-20 11:21:34');

-- --------------------------------------------------------

--
-- Table structure for table `provided_service`
--

CREATE TABLE `provided_service` (
  `id` int NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `unit_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `p_qty` int NOT NULL,
  `purchase_date` datetime DEFAULT NULL,
  `expiry_date` varchar(255) DEFAULT NULL,
  `renew_date` varchar(255) DEFAULT NULL,
  `service_time` varchar(100) NOT NULL,
  `notify_time` int NOT NULL,
  `notification_type` varchar(255) NOT NULL,
  `sms_id` varchar(20) DEFAULT NULL,
  `email_id` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `provided_service`
--

INSERT INTO `provided_service` (`id`, `product_name`, `unit_id`, `customer_id`, `p_qty`, `purchase_date`, `expiry_date`, `renew_date`, `service_time`, `notify_time`, `notification_type`, `sms_id`, `email_id`, `created_at`) VALUES
(59, 'GP SMS', 9, 15, 500, '2023-07-31 00:00:00', '2025-07-31 00:00:00', '2025-07-16', '24', 15, 'SMS', '18', '', '2023-07-31 08:46:14'),
(62, 'AP', 9, 4, 7, '2023-07-31 00:00:00', '2026-07-31 00:00:00', '2026-07-01', '36', 30, 'EMAIL', '', '17', '2023-07-31 09:03:16');

-- --------------------------------------------------------

--
-- Table structure for table `services_mail`
--

CREATE TABLE `services_mail` (
  `id` int NOT NULL,
  `service_id` int NOT NULL,
  `mail_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mail_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_time`
--

CREATE TABLE `service_time` (
  `id` int NOT NULL,
  `year` int DEFAULT NULL,
  `month` int DEFAULT NULL,
  `service_details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `service_time`
--

INSERT INTO `service_time` (`id`, `year`, `month`, `service_details`) VALUES
(1, 10, 4, '10 Year based'),
(2, 5, 3, '5 Year based'),
(7, 8, 6, 'Long time service');

-- --------------------------------------------------------

--
-- Table structure for table `sms_api`
--

CREATE TABLE `sms_api` (
  `id` int NOT NULL,
  `sms_url` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sms_api`
--

INSERT INTO `sms_api` (`id`, `sms_url`, `user_name`, `api_key`, `password`) VALUES
(1, 'https://docs.google.com/spreadsheets/d/1mIXKUEPhiHtrUGyCLCVf3nnljQ-5fIocCOzmLvTLnCA/edit#gid=0', 'ABC', '2625432', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `smtp`
--

CREATE TABLE `smtp` (
  `id` int NOT NULL,
  `smtp_url` varchar(255) DEFAULT NULL,
  `port_num` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `smtp`
--

INSERT INTO `smtp` (`id`, `smtp_url`, `port_num`, `email`, `password`) VALUES
(1, 'https://www.google.com/maps/place/Australia/', '3453', 'australia@email.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int NOT NULL,
  `unit_name` varchar(100) NOT NULL,
  `unit_details` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `unit_name`, `unit_details`, `created_at`) VALUES
(9, 'PCS', 'Product Pieces', '2023-05-27 11:53:55'),
(10, 'Degree', 'Degree ', '2023-07-11 07:13:13'),
(11, 'NOA', 'Number of account', '2023-07-13 09:00:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_phone` varchar(11) DEFAULT NULL,
  `user_type` varchar(100) DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `confirm_password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `user_phone`, `user_type`, `user_email`, `user_password`, `confirm_password`, `created_at`) VALUES
(2, 'arnab', '01681081476', NULL, 'arnab@bmitsolutionsltd.com', '$2b$12$m4A5GeQ..PNrNNNEl1./1uho8UvMRcHxcK3uyj4aoYXwH7zvn7V9C', '$2b$12$m4A5GeQ..PNrNNNEl1./1uho8UvMRcHxcK3uyj4aoYXwH7zvn7V9C', NULL),
(6, 'peuli', '53436526432', NULL, 'peuli@gmail.com', '$2b$12$1vaBuxMf4QCsu85QmJe7VejrwYV4aNWEyfcENC7hoD8C.Mjl3Y9N6', '$2b$12$1vaBuxMf4QCsu85QmJe7VejrwYV4aNWEyfcENC7hoD8C.Mjl3Y9N6', NULL),
(10, 'rana@', '6254514334', NULL, 'rana@email.com', '$2b$12$o/vB6TwCN4UNBT2lWaY0i.3MrqS8q.u7BgZuJazY5z1IP2KFUOaEi', '$2b$12$o/vB6TwCN4UNBT2lWaY0i.3MrqS8q.u7BgZuJazY5z1IP2KFUOaEi', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mail_contents`
--
ALTER TABLE `mail_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provided_service`
--
ALTER TABLE `provided_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services_mail`
--
ALTER TABLE `services_mail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_products_unit_id` (`service_id`),
  ADD KEY `ix_products_id` (`id`),
  ADD KEY `ix_products_product_qty` (`mail_id`),
  ADD KEY `ix_products_product_name` (`mail_type`);

--
-- Indexes for table `service_time`
--
ALTER TABLE `service_time`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ix_Service_time_service_details` (`service_details`),
  ADD UNIQUE KEY `ix_Service_time_year` (`year`),
  ADD KEY `ix_Service_time_id` (`id`);

--
-- Indexes for table `sms_api`
--
ALTER TABLE `sms_api`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_sms_api_user_name` (`user_name`),
  ADD KEY `ix_sms_api_api_key` (`api_key`),
  ADD KEY `ix_sms_api_password` (`password`),
  ADD KEY `ix_sms_api_id` (`id`),
  ADD KEY `ix_sms_api_sms_url` (`sms_url`);

--
-- Indexes for table `smtp`
--
ALTER TABLE `smtp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_smtp_id` (`id`),
  ADD KEY `ix_smtp_email` (`email`),
  ADD KEY `ix_smtp_password` (`password`),
  ADD KEY `ix_smtp_smtp_url` (`smtp_url`),
  ADD KEY `ix_smtp_port_num` (`port_num`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `mail_contents`
--
ALTER TABLE `mail_contents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `provided_service`
--
ALTER TABLE `provided_service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `services_mail`
--
ALTER TABLE `services_mail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_time`
--
ALTER TABLE `service_time`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sms_api`
--
ALTER TABLE `sms_api`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `smtp`
--
ALTER TABLE `smtp`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
