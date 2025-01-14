import { Alert } from '@console/internal/components/monitoring/types';
import { fetchMonitoringAlerts } from '@console/internal/components/overview/metricUtils';

type StopOverviewAUpdater = () => void;

export const useOverviewAlertsUpdater = (
  namespace: string,
  updateMonitoringAlerts: (alerts: Alert[]) => void,
  interval: number = 15 * 1000,
): StopOverviewAUpdater => {
  let alertsInterval: any = null;

  const fetchAlerts = (): void => {
    fetchMonitoringAlerts(namespace)
      .then((alerts) => {
        updateMonitoringAlerts(alerts);
      })
      .catch((e) => {
        console.error('Failed to fetch monitoring alerts', e); // eslint-disable-line no-console
      })
      .then(() => {
        alertsInterval = setTimeout(fetchAlerts, interval);
      })
      .catch((e) => {
        console.error('Failed to fetch monitoring alerts', e); // eslint-disable-line no-console
      });
  };

  fetchAlerts();

  return () => {
    clearTimeout(alertsInterval);
  };
};
