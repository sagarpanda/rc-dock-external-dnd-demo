import React, { useRef } from 'react';
import shortid from 'shortid';
import DockLayout, { LayoutData, DragDropDiv, DragState } from 'rc-dock';
import 'rc-dock/dist/rc-dock.css';

const defaultLayout: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [
          { id: 'tab1', title: 'tab1', content: <div>Hello World 1</div> },
          { id: 'tab2', title: 'tab2', content: <div>Hello World 2</div> },
          { id: 'tab3', title: 'tab3', content: <div>Hello World 3</div> },
          { id: 'tab4', title: 'tab4', content: <div>Hello World 4</div> }
        ]
      }
    ]
  }
};

const RCDockDnD = () => {
  const dockLayoutRef = useRef<DockLayout>();
  const getdockLayoutRef = (r: any) => {
    dockLayoutRef.current = r;
  };
  const handleDragStart = (e: DragState) => {
    const uuid = shortid.generate();
    const target = e.event.target as HTMLButtonElement;
    if(target.classList.contains('dock-dragging')) {
      e.setData(
        {
          tab: { id: uuid, title: 'New Tab', content: `New Tab Content - ${uuid}`, parent: { tabs: [] } },
          panelSize: [200, 200]
        },
        dockLayoutRef.current?.getDockId()
      );
      e.startDrag(target, target);
    }
  }

  return (
    <>
      <div>
        <DragDropDiv onDragStartT={handleDragStart}>
          <button className="dock-dragging">Drag Me</button>
        </DragDropDiv>
      </div>
      <DockLayout
        ref={getdockLayoutRef}
        defaultLayout={defaultLayout}
        dropMode='edge'
        style={{
          position: 'absolute',
          left: 10,
          top: 40,
          right: 10,
          bottom: 10
        }}
      />
    </>
  );
};

export default RCDockDnD;
