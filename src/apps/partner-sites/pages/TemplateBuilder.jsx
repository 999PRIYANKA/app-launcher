import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  LayoutTemplate,
  Save,
  ArrowLeft,
  MoveVertical,
} from "lucide-react";
import { SECTION_COMPONENTS, getDefaultContent } from '../../../components/marketing/Sections';
import { STARTER_TEMPLATES } from '../../../templates/starterTemplates';
import CustomButton from '../../../components/common/CustomButton';

// --- Types & Constants ---
const AVAILABLE_SECTIONS = [
  { type: "hero", label: "Hero Section" },
  { type: "features", label: "Features Grid" },
  { type: "about", label: "About / Split" },
  { type: "testimonials", label: "Testimonials" },
  { type: "pricing", label: "Pricing Table" },
  { type: "faq", label: "FAQ Accordion" },
  { type: "contact", label: "Contact Form" },
  { type: "footer", label: "Footer" },
];

// --- Sortable Item Wrapper ---
const SortableSectionItem = ({
  section,
  isSelected,
  onSelect,
  onDelete,
  onToggleVisibility,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component = SECTION_COMPONENTS[section.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group border-2 transition-all ${
        isSelected
          ? "border-brand-500 ring-4 ring-brand-500/10 z-10"
          : "border-transparent hover:border-brand-300"
      }`}
      onClick={onSelect}
    >
      {/* Overlay Controls */}
      <div
        className={`absolute top-2 right-2 flex items-center gap-1 bg-white shadow-lg rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 ${
          isSelected ? "opacity-100" : ""
        }`}
      >
        <div
          {...attributes}
          {...listeners}
          className="p-1.5 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing text-gray-500"
        >
          <GripVertical size={16} />
        </div>
        <button
          onClick={onToggleVisibility}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
        >
          {section.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 hover:bg-red-50 text-red-500 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Render Component */}
      <div
        className={
          !section.isVisible
            ? "opacity-40 grayscale pointer-events-none"
            : ""
        }
      >
        {Component ? (
          <Component content={section.content} />
        ) : (
          <div className="p-10 text-center bg-gray-100">
            Unknown Section Type
          </div>
        )}
      </div>
    </div>
  );
};

// --- Config Panel ---
const ConfigPanel = ({ section, onUpdate }) => {
  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
        <LayoutTemplate size={48} className="mb-4 opacity-20" />
        <p>Select a section on the canvas to edit its properties.</p>
      </div>
    );
  }

  const handleChange = (key, value) => {
    onUpdate(section.id, { ...section.content, [key]: value });
  };

  const renderInputs = () => {
    return Object.keys(section.content).map((key) => {
      const value = section.content[key];

      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      // Array inputs (Features, Testimonials, Plans) - Simplified for demo
      if (Array.isArray(value)) {
        return (
          <div
            key={key}
            className="col-span-full mt-4 border-t border-gray-100 pt-4"
          >
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              {label} (List Items)
            </label>
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-500">
              List editing is simplified in this demo.
              <br />
              Actual builder would have a nested list editor here.
            </div>
          </div>
        );
      }

      // Text Area for long text
      if (
        typeof value === "string" &&
        value.length > 50 &&
        !key.includes("Url")
      ) {
        return (
          <div key={key} className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              rows={4}
            />
          </div>
        );
      }

      // Standard Input
      return (
        <div
          key={key}
          className={value.length > 30 ? "col-span-full" : "col-span-1"}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
      );
    });
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6 pb-6 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Editing
        </span>
        <h2 className="text-xl font-bold text-gray-900 capitalize">
          {section.type} Section
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">{renderInputs()}</div>
    </div>
  );
};

// --- Main Builder Component ---
export const TemplateBuilder = () => {
  const [sections, setSections] = useState(
    STARTER_TEMPLATES["SaaS Landing"]
  );
  const [selectedId, setSelectedId] = useState(null);
  const [activeDragId, setActiveDragId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddSection = (type) => {
    const newSection = {
      id: `${type}-${Date.now()}`,
      type,
      isVisible: true,
      content: getDefaultContent(type),
    };

    setSections([...sections, newSection]);
    setSelectedId(newSection.id);

    // Scroll to bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleUpdateSection = (id, newContent) => {
    setSections(
      sections.map((s) =>
        s.id === id ? { ...s, content: newContent } : s
      )
    );
  };

  const handleDeleteSection = (e, id) => {
    e.stopPropagation();
    setSections(sections.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleToggleVisibility = (e, id) => {
    e.stopPropagation();
    setSections(
      sections.map((s) =>
        s.id === id ? { ...s, isVisible: !s.isVisible } : s
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragId(null);
    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id);
  };

  const loadTemplate = (templateName) => {
    if (confirm("This will overwrite your current work. Continue?")) {
      setSections(
        JSON.parse(JSON.stringify(STARTER_TEMPLATES[templateName]))
      );
      setSelectedId(null);
    }
  };

  const selectedSection = sections.find((s) => s.id === selectedId) || null;

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-50 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 hover:bg-gray-100 rounded-md text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-bold text-gray-900">Template Builder</span>
          <div className="h-4 w-px bg-gray-300 mx-2"></div>
          <select
            className="text-sm border-none bg-transparent font-medium text-gray-600 focus:ring-0 cursor-pointer hover:text-brand-600"
            onChange={(e) => loadTemplate(e.target.value)}
            defaultValue="SaaS Landing"
          >
            {Object.keys(STARTER_TEMPLATES).map((t) => (
              <option key={t} value={t}>
                {t} Template
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <CustomButton
            onClick={() => alert("Save functionality to be implemented")}
            label="Save Template"
            variant="primary"
            size="small"
            iconComponent={<Save size={16} />}
            className="bg-brand-600 hover:bg-brand-700"
            style={{
              backgroundColor: "#2563eb",
            }}
          />
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Component Library */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Components
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {AVAILABLE_SECTIONS.map((item) => (
              <button
                key={item.type}
                onClick={() => handleAddSection(item.type)}
                className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand-400 hover:shadow-md transition-all text-left group"
              >
                <div className="bg-gray-100 p-2 rounded text-gray-500 group-hover:text-brand-600 group-hover:bg-brand-50 transition-colors">
                  <Plus size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Center Canvas: Live Preview */}
        <main className="flex-1 bg-gray-100 overflow-y-auto scroll-smooth relative">
          <div className="min-h-full max-w-5xl mx-auto bg-white shadow-2xl my-8">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col min-h-[800px]">
                  {sections.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                      <p>Drag components here or click + to add</p>
                    </div>
                  ) : (
                    sections.map((section) => (
                      <SortableSectionItem
                        key={section.id}
                        section={section}
                        isSelected={selectedId === section.id}
                        onSelect={() => setSelectedId(section.id)}
                        onDelete={(e) => handleDeleteSection(e, section.id)}
                        onToggleVisibility={(e) =>
                          handleToggleVisibility(e, section.id)
                        }
                      />
                    ))
                  )}
                </div>
              </SortableContext>
              <DragOverlay>
                {activeDragId ? (
                  <div className="bg-white opacity-80 border-2 border-brand-500 p-4 shadow-xl">
                    <div className="flex items-center gap-2 text-brand-600 font-bold">
                      <MoveVertical size={20} /> Moving Section...
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          {/* Add Space at bottom for scrolling */}
          <div className="h-32"></div>
        </main>

        {/* Right Sidebar: Config Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 shrink-0 z-40 shadow-xl">
          <ConfigPanel section={selectedSection} onUpdate={handleUpdateSection} />
        </aside>
      </div>
    </div>
  );
};

export default TemplateBuilder;

