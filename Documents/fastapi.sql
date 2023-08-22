-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 22, 2023 at 11:41 AM
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
(4, 'Xens ax', 'xens@email.com', '857554736543', 'Korea', 'Korean Company', NULL),
(5, 'Bill Gates', 'billgates@email.com', '8576364563', 'America', 'Microsoft', NULL),
(15, 'G.P.', 'gp@email.com', '0170000000', 'Bosundhara ', 'Grameen Phone', NULL),
(16, 'MD. Babor Ali', 'babor@bmitsolutionsltd.com', '01716462613', '31 Lakedrive road', 'Cyber Trust', NULL);

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
  `purchase_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `renew_date` varchar(255) DEFAULT NULL,
  `service_time` varchar(100) NOT NULL,
  `notify_time` varchar(20) NOT NULL,
  `notification_type` varchar(255) NOT NULL,
  `sms_id` varchar(20) DEFAULT NULL,
  `email_id` varchar(20) DEFAULT NULL,
  `auto_renew` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `provided_service`
--

INSERT INTO `provided_service` (`id`, `product_name`, `unit_id`, `customer_id`, `p_qty`, `purchase_date`, `expiry_date`, `renew_date`, `service_time`, `notify_time`, `notification_type`, `sms_id`, `email_id`, `auto_renew`, `created_at`) VALUES
(59, 'GP SMS', 9, 15, 500, '2023-07-31', '2025-07-31', '2025-07-16', '24', '15', 'SMS', '18', '', 'NO', '2023-07-31 08:46:14'),
(62, 'AP', 9, 4, 9, '2023-07-31', '2024-07-31', '2024-07-01', '12', '30', 'EMAIL', '', '17', 'YES', '2023-07-31 09:03:16'),
(77, 'Microsoft Email Service', 14, 16, 10, '2023-08-01', '2023-09-01', '2023-08-25', '1', '7', 'EMAIL', '', '17', 'YES', '2023-08-09 05:48:42'),
(78, 'Domain', 14, 16, 3, '2023-08-09', '2023-11-09', '2023-10-25', '3', '15', 'SMS', '16', '', 'YES', '2023-08-09 09:46:40');

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
(9, 'PCS', 'Product Pieces', '2023-08-17 08:48:38'),
(11, 'NOA', 'Number of account', '2023-08-17 08:48:44'),
(14, 'License', 'License', '2023-08-16 08:50:48');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `mail_contents`
--
ALTER TABLE `mail_contents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `provided_service`
--
ALTER TABLE `provided_service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
