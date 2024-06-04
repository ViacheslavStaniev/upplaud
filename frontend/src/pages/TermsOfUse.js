import AppTitle from '../components/AppTitle';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function TermsOfUse() {
  const termsOfUse = [
    {
      title: 'Acceptance of Terms',
      content:
        'By accessing and using the Upplaud website (the "Website"), you accept and agree to be bound by these Terms of Use. If you do not agree to these Terms of Use, please do not use the Website.',
    },
    {
      title: 'Use of the Website',
      content:
        'You agree to use the Website in accordance with all applicable local, state, national, and international laws and regulations. You are responsible for your own communications and for any consequences thereof.',
    },
    {
      title: 'Intellectual Property',
      content:
        'All content on the Website, including text, graphics, logos, and images, is the property of Upplaud or its content suppliers and protected by intellectual property laws. Unauthorized use of this content is prohibited.',
    },
    {
      title: 'User Content',
      content:
        'By submitting content to the Website, you grant Upplaud a worldwide, non-exclusive, royalty-free license to use, distribute, reproduce, modify, adapt, and publicly display such content. You are solely responsible for the content you upload.',
    },
    {
      title: 'Third-Party Links',
      content:
        'The Website may contain links to third-party websites. Upplaud is not responsible for the content or privacy practices of these websites. Your use of linked websites is at your own risk.',
    },
    {
      title: 'Disclaimer of Warranties',
      content:
        'The Website is provided "as is" and "as available" without any warranties of any kind. Upplaud disclaims all warranties, express or implied, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
    },
    {
      title: 'Limitation of Liability',
      content:
        'Upplaud shall not be liable for any damages arising out of or in connection with your use of the Website, including direct, indirect, incidental, consequential, and punitive damages.',
    },
    {
      title: 'Governing Law',
      content:
        'These Terms of Use are governed by and construed in accordance with the laws of the jurisdiction in which Upplaud is based, without regard to its conflict of law principles.',
    },
    {
      title: 'Changes to Terms',
      content:
        'Upplaud reserves the right to change these Terms of Use at any time. Your continued use of the Website after any changes constitutes your acceptance of the new Terms of Use.',
    },
    {
      title: 'Contact Information',
      content:
        'If you have any questions about these Terms of Use, please contact us at support@upplaud.com.',
    },
  ];

  return (
    <div className="terms-of-use p-2">
      <AppTitle title="Terms of Use" />
      <Title level={2}>Terms of Use</Title>

      {termsOfUse.map(({ title, content }, index) => (
        <div key={index} className="term">
          <Title level={4} className="mb-0">
            {title}
          </Title>
          <Paragraph>{content}</Paragraph>
        </div>
      ))}
    </div>
  );
}
