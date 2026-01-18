# EasyTier Privacy Policy

**Effective Date: January 18, 2026**

EasyTier is a simple, secure, decentralized tool for intranet penetration and remote networking. This Privacy Policy explains how we handle relevant privacy information during the installation and use of the EasyTier software.

_This policy applies only to first-party software released by EasyTier and officially maintained servers, and does not apply to any third-party services or software._

_The original version of this policy is written in Chinese. In the event of any discrepancies in interpretation, the Chinese version shall prevail._

## 1. Information Related to Inter-Node Communication

### 1.1 Node Discovery Information

In networking scenarios other than “Standalone” mode, in order to enable interconnection between devices across networks and perform NAT traversal, EasyTier will access networking servers manually specified by the user. When initiating a network or searching for peer nodes, the client program sends connection requests to the server. Such requests may include, but are not limited to, the local node’s network configuration parameters and virtual IP address. Based on these requests, the server identifies and returns the client’s public-facing IP address and port information, and announces the necessary metadata to authorized peer nodes whose network configurations are compatible.

### 1.2 Network Connection Information

To optimize data transmission efficiency and automatically select the best paths, the software dynamically processes local network topology information during operation, including but not limited to peer node latency, connection path status, and packet loss rates, and announces this information to peer nodes. Such technical information is maintained in real time only in device memory, solely to ensure network stability and performance. It is not uploaded to any central server, nor is it persistently stored across sessions.

### 1.3 Statement on Information Processing

The data described in this section may contain information capable of identifying a user’s personal identity. For public servers and relay nodes, the client may transmit such data in plaintext. We do not take responsibility for the security of data during transmission; please be aware of the associated risks. For public servers provided by this software, we process such data only to the extent necessary for node discovery, connection establishment, and network maintenance. We do not persistently store the data, nor do we use it for any other purposes. For third-party servers, we do not control their data processing policies and assume no responsibility for them.

## 2. Traffic and Security

### 2.1 Data Encryption

EasyTier uses industry-standard symmetric encryption algorithms (such as AES-GCM or ChaCha20-Poly1305) by default to protect all transmitted traffic. Users are required to configure a consistent pre-shared key (PSK) among networking nodes. All data transmitted through this software is encrypted before leaving the sender, ensuring that only legitimate nodes holding the correct key can decrypt and read the communication content. We do not possess your private keys and therefore cannot access any of your communication data.

### 2.2 Data Handling in Relay Mechanisms

In complex network environments where direct P2P connections cannot be established, encrypted traffic may be forwarded through relay nodes. Even in such scenarios, the traffic remains symmetrically encrypted. Relay nodes are responsible only for packet forwarding and routing, do not have decryption capabilities, and cannot access or analyze the encrypted original data content.

## 3. Servers

### 3.1 Public Servers

To assist with NAT detection and hole punching, this software provides public EasyTier servers hosted by third-party service providers for user access. When the software interacts with these servers, your public IP address, port information, and basic network metadata may be exposed to those third-party service providers. The processing of such data is governed by the respective providers’ own privacy policies. We recommend that you review the relevant policies of those parties.

### 3.2 Third-Party Servers

This software allows users to specify and connect to networking servers or relay nodes operated by third parties. Users should be aware that connecting to such servers means that your connection metadata (such as IP address and network information) will be visible to the server operator. The developer assumes no responsibility for the security, data handling practices, or service stability of any third-party servers, nor any direct or indirect legal liability arising therefrom.

## 4. Data Retention and Storage

### 4.1 Local Configuration Storage

This software stores network configuration files (including virtual IP addresses, pre-shared symmetric keys, node public/private keys, and peer addresses) on your local device. The software does not provide any form of cloud backup or synchronization services. Such sensitive configuration information will never be automatically synchronized or uploaded to any central server. Users are responsible for managing the security of their local configuration files.

### 4.2 Logs and Analytical Data

This software does not collect or transmit user operation logs, behavioral patterns, or traffic analysis data. All runtime data used to maintain network connections is stored only in local memory. Once the program is closed or the process terminates, such temporary data is immediately cleared and leaves no trace on local disks or remote servers.

### 4.3 Server-Side Data Storage

For official public networking servers provided by us, we temporarily maintain node discovery and network connection information in memory only when necessary. Such data becomes invalid as soon as a node goes offline or a connection is established. Unless explicitly required by laws, regulations, or regulatory authorities, we do not persistently store such data, nor do we use it for any purpose other than connection establishment. For third-party servers specified by users, we cannot control their data storage policies and assume no responsibility for their storage practices.

## 5. Children’s Privacy Protection

EasyTier is a network utility software and is not designed to attract or target children. As the software does not implement an account system and does not collect personal identity information by design, we do not knowingly collect, process, or store any personal data of children under the age of 13 (or the applicable age as defined by local laws).

## 6. Policy Revisions

As software features evolve or the legal environment changes, we may revise this Privacy Policy from time to time. Any revisions will be updated on this page and marked with a revised effective date. We recommend that you review this policy periodically to stay informed about our latest practices regarding technical data handling and privacy protection. Your continued use of the software after policy revisions indicates that you have read and accepted the updated policy.

## 7. Contact Us

If you have any questions about this Privacy Policy or EasyTier’s data handling practices, please contact us via [Contact Information](contact).
