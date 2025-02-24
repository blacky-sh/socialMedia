import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  useColorModeValue,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const PrivacySecurityPage = () => {
  return (
    <Container maxW="container.xl" py={12}>
      <Box
        bg={useColorModeValue("white", "gray.dark")}
        p={8}
        borderRadius="lg"
        boxShadow="xl"
      >
        <Heading as="h2" size="2xl" mb={8} textAlign="center">
          Privacy and Security Guidelines for Our Social Media Platform
        </Heading>

        <Text fontSize="lg" mb={6}>
          At Noor, we understand the importance of your privacy and the security
          of your data. This document outlines our comprehensive approach to
          protecting your information and ensuring a safe and trustworthy
          environment. Please read it carefully to understand how we collect,
          use, store, and protect your data.
        </Text>

        <Accordion allowToggle mb={8}>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  1. Detailed Data Collection and Storage Practices
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={4}>
                We collect a range of data to provide and improve our services.
                This includes:
              </Text>
              <List spacing={3} mb={4}>
                <ListItem>
                  <strong>Personal Identification:</strong> Full name, username,
                  email address, gender, and date of birth.
                </ListItem>
                <ListItem>
                  <strong>Profile Information:</strong> Profile pictures, bio,
                  and any other information you choose to add to your profile.
                </ListItem>
                <ListItem>
                  <strong>Content:</strong> Posts, comments, messages, and any
                  other content you create or share on the platform.
                </ListItem>
                <ListItem>
                  <strong>Usage Data:</strong> Information about how you
                  interact with the app, such as liked posts, viewed profiles,
                  and time spent on the platform.
                </ListItem>
                <ListItem>
                  <strong>Technical Data:</strong> IP addresses, browser type,
                  device information, and other technical data collected for
                  security and analytics purposes.
                </ListItem>
                <ListItem>
                  <strong>Password Security:</strong> We use bcrypt to hash and
                  encrypt passwords, providing a strong layer of protection
                  against unauthorized access.
                </ListItem>
              </List>
              <Text mb={4}>
                All text data is stored in a secure, cloud-based MongoDB
                database. Media files are stored on Cloudinary.com, a leading
                cloud-based media management platform. We rely on the robust
                security measures provided by these services.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  2. User Interactions, Content Sharing, and Responsible Usage
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={4}>
                Our platform facilitates various interactions, including public
                posts, comments, direct messages, and &quot;lost item&quot;
                tags. We encourage responsible and respectful communication.
                Please be mindful of the content you share, as public posts can
                be viewed by all users.
              </Text>
              <Text mb={4}>
                Direct messages are private between the sender and recipient. We
                implement measures to prevent spam and abuse, but we also rely
                on user reporting to maintain a safe environment.
              </Text>
              <Text mb={4}>
                We strongly discourage the sharing of sensitive personal
                information publicly. If you encounter any content that violates
                our community guidelines, please report it immediately.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  3. Comprehensive Security Measures
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <List spacing={3} mb={4}>
                <ListItem>
                  <strong>Password Security:</strong> We use bcrypt for password
                  hashing, ensuring that your password is never stored in plain
                  text.
                </ListItem>
                <ListItem>
                  <strong>Rate Limiting:</strong> We implement rate limiting to
                  prevent brute-force attacks and other malicious activities.
                  For example, multiple failed login attempts will result in
                  temporary account lockouts.
                </ListItem>
                <ListItem>
                  <strong>HTTPS Encryption:</strong> All data transmitted
                  between your device and our servers is encrypted using HTTPS,
                  protecting your information from interception.
                </ListItem>
                <ListItem>
                  <strong>Input Validation:</strong> We perform rigorous input
                  validation to prevent common security vulnerabilities like
                  cross-site scripting (XSS) and SQL injection.
                </ListItem>
                <ListItem>
                  <strong>Access Control:</strong> We implement granular access
                  control to ensure that users can only access the data and
                  features they are authorized to use.
                </ListItem>
                <ListItem>
                  <strong>Regular Security Audits:</strong> We conduct regular
                  security audits and penetration testing to identify and
                  address potential vulnerabilities.
                </ListItem>
                <ListItem>
                  <strong>Dependency Updates:</strong> We keep all dependencies
                  and libraries up to date to patch known security flaws.
                </ListItem>
                <ListItem>
                  <strong>
                    Two-Factor Authentication (Future Implementation):
                  </strong>{" "}
                  We plan to implement two-factor authentication to add an extra
                  layer of security to your account.
                </ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  4. User Consent, Data Deletion, and Privacy Rights
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={4}>
                We are committed to respecting your privacy rights. We will
                provide a clear and comprehensive privacy policy that outlines
                our data collection and usage practices. You will have the
                option to review and manage your privacy settings.
              </Text>
              <Text mb={4}>
                We will provide a straightforward process for users to request
                the deletion of their accounts and associated data.
              </Text>
              <Text mb={4}>
                We respect your right to access, rectify, and erase your
                personal data. If you have any questions or concerns about your
                privacy, please contact us.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  5. Third-Party Services and Data Sharing
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={4}>
                We utilize trusted third-party services, such as MongoDB and
                Cloudinary, for data storage and media management. We have
                carefully reviewed their security and privacy policies to ensure
                they meet our standards.
              </Text>
              <Text mb={4}>
                We only share data with third-party services when it is
                necessary to provide our services or comply with legal
                obligations. We do not sell your personal data to third parties.
              </Text>
              <Text mb={4}>
                We will provide a list of all third party services used, and
                links to their privacy policies.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          {/* <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  6. Incident Response and Data Breach Notification
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={4}>
                In the event of a security incident or data breach, we have a
                comprehensive incident response plan in place. We will promptly
                investigate the incident, take necessary steps to mitigate the
                impact, and notify affected users as required by law.
              </Text>
              <Text mb={4}>
                We will maintain detailed logs of all security incidents and
                actions taken. We will also conduct post-incident reviews to
                identify areas for improvement in our security practices.
              </Text>
              <Text mb={4}>
                We will provide clear channels for users to report security
                vulnerabilities or suspected data breaches.
              </Text>
            </AccordionPanel>
          </AccordionItem> */}

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  6. User Education and Awareness
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={4}>
                We are committed to educating our users about best practices for
                online security and privacy. We will provide resources and tips
                to help you protect your data and stay safe online.
              </Text>
              <Text mb={4}>
                We will regularly update our privacy and security guidelines to
                reflect changes in technology and best practices.
              </Text>
              <Text mb={4}>
                We encourage you to use strong, unique passwords, enable
                two-factor authentication (when available), and be cautious
                about sharing personal information online.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          {/* <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3" size="xl">
                  8. Compliance with Applicable Laws and Regulations
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text mb={4}>
                We are committed to complying with all applicable laws and
                regulations related to data privacy and security, including but
                not limited to [Mention Specific Laws like GDPR, CCPA, etc., if
                applicable].
              </Text>
              <Text mb={4}>
                We will regularly review and update our policies and procedures
                to ensure compliance with evolving legal requirements.
              </Text>
              <Text mb={4}>
                If you have any questions or concerns about our compliance with
                applicable laws and regulations, please contact us.
              </Text>
            </AccordionPanel>
          </AccordionItem> */}
        </Accordion>

        <Text fontSize="sm" mt={4} textAlign="center">
          If you have any questions or concerns about our privacy and security
          practices, please contact us at noor.finder@gmail.com.
        </Text>
      </Box>
    </Container>
  );
};

export default PrivacySecurityPage;
