
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
    try {
      console.log("Tasks received in BigScheduler:", tasks);
      if (tasks.length === 0) {
        console.log("No tasks to display");
        return;
      }
      
      // Création d'une nouvelle instance de SchedulerData
      const schedulerData = new SchedulerData(
        moment().format('YYYY-MM-DD'), 
        ViewType.Month, 
        false, 
        false, 
        {
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
        }
      );

      // Create resource groups by project
      const uniqueProjects = new Map();
      tasks.forEach(task => {
        if (task.projectId && task.projectName) {
          uniqueProjects.set(task.projectId, task.projectName);
        }
      });
      
      // If no projects found, use a default resource
      const resources = uniqueProjects.size > 0 
        ? Array.from(uniqueProjects.entries()).map(([id, name]) => ({
            id,
            name
          }))
        : [{
            id: 'project',
            name: 'Tous les projets'
          }];
          
      console.log("Resources created:", resources);

      // Prepare events for the scheduler
      const events = tasks.map(task => {
        const resourceId = task.projectId || 'project';
        return {
          id: task.id,
          title: task.title,
          start: moment(task.start).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(task.end).format('YYYY-MM-DD HH:mm:ss'),
          resourceId,
          bgColor: '#1e40af',
          movable: true,
          resizable: true,
        };
      });
      
      console.log("Events created:", events);

      schedulerData.setResources(resources);
      schedulerData.setEvents(events);
      setViewModel(schedulerData);
      
      console.log("Scheduler data initialized successfully");
    } catch (error) {
      console.error("Error initializing scheduler:", error);
    }
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
      <style>{`
        .scheduler-container {
          margin: 0;
          height: 650px;
          width: 100%;
          overflow: visible;
        }
        .scheduler-container table {
          width: 100% !important;
        }
        .event-item {
          border-radius: 3px;
        }
        .scheduler-table, .scheduler-content, .resource-view, .scheduler-view {
          width: 100% !important;
          overflow: visible !important;
        }
        .scheduler-bg-table {
          width: 100% !important;
        }
        .scheduler-content {
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default BigScheduler;
