import qs from 'qs';
import {Linking} from 'react-native';

export default async (to, subject, body, options = {}) => {
  const {cc, bcc} = options;

  let url = `mailto:${to}`;
  const query = await qs.stringify({
    subject,
    body,
    cc,
    bcc,
  });
  if (query.length) {
    url += `?${query}`;
  }

  return Linking.openURL(url);
};
