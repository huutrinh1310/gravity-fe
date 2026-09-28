import { useAuth } from '@/app/providers/AuthProvider';
import { Box, Group, Text } from '@mantine/core';

export function SiteFooter() {
  const { name, email } = useAuth();

  return (
    <Box id="contact" className="site-footer" component="footer">
      <Group className="site-footer-content" justify="space-between">
        <Box>
          <Text className="eyebrow" component="span">
            (e) contact
          </Text>
          <a className="footer-email chrometxt" href={`mailto:${email}`}>
            {email}
          </a>
        </Box>
        <Text className="footer-credit" component="p">
          ©2026 {name} — built by hand
        </Text>
      </Group>
    </Box>
  );
}
