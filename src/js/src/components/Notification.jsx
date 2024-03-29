import { notification } from 'antd';

const openNotificationWithIcon = (type, message, description) => {
  api[type]({
    message,
    description,
  });
};

export const SuccessNotification = (message, description) =>
  openNotificationWithIcon('success', message, description);

export const InfoNotification = (message, description) =>
  openNotificationWithIcon('info', message, description);

export const WarningNotification = (message, description) =>
  openNotificationWithIcon('warning', message, description);

export const ErrorNotification = (message, description) =>
  openNotificationWithIcon('error', message, description);
