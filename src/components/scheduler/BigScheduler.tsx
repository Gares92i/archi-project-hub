
import React, { useState, useEffect } from 'react';
import Scheduler, { SchedulerData, ViewType } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

interface BigSchedulerProps {
  tasks: {
    id: string;
    title: string;
    start: string;
    end: string;
  }[];
}

const BigScheduler = ({ tasks }: BigSchedulerProps) => {
  const [viewModel, setViewModel] = useState<any>(null);

  useEffect(() => {
    // Création d'une nouvelle instance de SchedulerData
    const schedulerData = new SchedulerData(moment().format('YYYY-MM-DD'), ViewType.Month, false, false, {
      schedulerWidth: '100%',
      besidesWidth: 20,
      weekMaxEvents: 99,
      monthMaxEvents: 99,
      views: [
        { viewName: 'Mois', viewType: ViewType.Month },
        { viewName: 'Semaine', viewType: ViewType.Week },
        { viewName: 'Jour', viewType: ViewType.Day }
      ],
      resourceName: 'Projets',
      dayMaxEvents: 99,
      headerEnabled: true,
      displayWeekend: true,
      eventItemPopoverEnabled: true,
      startResizable: true,
      endResizable: true,
      movable: true,
    });

    // Convertir les tâches au format attendu par le scheduler
    const resources = [{
      id: 'project',
      name: 'Tous les projets'
    }];

    const events = tasks.map(task => ({
      id: task.id,
      title: task.title,
      start: moment(task.start).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(task.end).format('YYYY-MM-DD HH:mm:ss'),
      resourceId: 'project',
      bgColor: '#1e40af',
      movable: true,
      resizable: true,
    }));

    schedulerData.setResources(resources);
    schedulerData.setEvents(events);
    setViewModel(schedulerData);
  }, [tasks]);

  const prevClick = (schedulerData: SchedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(schedulerData.events);
    setViewModel({...schedulerData});
  };

  const nextClick = (schedulerData: SchedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(schedulerData.events);
    setViewModel({...schedulerData});
  };

  const onViewChange = (schedulerData: SchedulerData, view: any) => {
    schedulerData.setViewType(view.viewType);
    schedulerData.setEvents(schedulerData.events);
    setViewModel({...schedulerData});
  };

  const onSelectDate = (schedulerData: SchedulerData, date: string) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(schedulerData.events);
    setViewModel({...schedulerData});
  };

  if (!viewModel) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="scheduler-container">
      <Scheduler
        schedulerData={viewModel}
        prevClick={prevClick}
        nextClick={nextClick}
        onViewChange={onViewChange}
        onSelectDate={onSelectDate}
        viewEventClick={() => {}}
        viewEventText="Voir les détails"
        viewEvent2Text="Modifier"
        viewEvent2Click={() => {}}
        updateEventStart={() => {}}
        updateEventEnd={() => {}}
        moveEvent={() => {}}
        toggleExpandFunc={() => {}}
      />
      <style jsx="true">{`
        .scheduler-container {
          margin: 20px 0;
          height: 600px;
          width: 100%;
        }
        .scheduler-container table {
          width: 100% !important;
        }
        .event-item {
          border-radius: 3px;
        }
        .overflow-y-auto {
          overflow: visible !important;
        }
        .scheduler-bg-table {
          width: 100% !important;
        }
        .resource-view {
          overflow: visible !important;
        }
        .scheduler-view {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
};

export default BigScheduler;
