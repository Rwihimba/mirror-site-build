import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import type { FormFieldDef } from "@/components/forms/DynamicApplicationForm";

interface FormBuilderProps {
  value: FormFieldDef[];
  onChange: (next: FormFieldDef[]) => void;
}

const FIELD_TYPES: { value: FormFieldDef["type"]; label: string }[] = [
  { value: "text", label: "Short text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "textarea", label: "Long text" },
  { value: "file", label: "File upload" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Multiple choice (one)" },
  { value: "checkbox", label: "Checkboxes (many)" },
];

const HAS_OPTIONS = new Set(["select", "radio", "checkbox"]);

export function FormBuilder({ value, onChange }: FormBuilderProps) {
  const fields = value || [];

  const update = (idx: number, patch: Partial<FormFieldDef>) => {
    const next = [...fields];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  const remove = (idx: number) => onChange(fields.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= fields.length) return;
    const next = [...fields];
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  const add = () => {
    onChange([
      ...fields,
      {
        id: `field_${Date.now()}`,
        type: "text",
        label: "Untitled question",
        required: false,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-lg">Application form</h3>
          <p className="text-xs text-muted-foreground font-body">Build the questions applicants will answer for this role.</p>
        </div>
        <Button type="button" size="sm" onClick={add}>
          <Plus className="w-4 h-4 mr-1" /> Add field
        </Button>
      </div>

      {fields.length === 0 && (
        <div className="border border-dashed border-border rounded-md p-6 text-center text-sm text-muted-foreground font-body">
          No fields yet. Add your first question.
        </div>
      )}

      {fields.map((f, idx) => (
        <div key={f.id} className="bg-muted/40 border border-border rounded-md p-4 space-y-3">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
            <Input
              value={f.label}
              onChange={(e) => update(idx, { label: e.target.value })}
              placeholder="Question label"
              className="flex-1 font-body"
            />
            <Button type="button" variant="ghost" size="sm" onClick={() => move(idx, -1)} disabled={idx === 0}>
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => move(idx, 1)} disabled={idx === fields.length - 1}>
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(idx)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-body">Type</Label>
              <Select value={f.type} onValueChange={(v) => update(idx, { type: v as FormFieldDef["type"] })}>
                <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FIELD_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-body">Field key</Label>
              <Input
                value={f.id}
                onChange={(e) => update(idx, { id: e.target.value.replace(/\s+/g, "_") })}
                className="font-body font-mono text-xs"
              />
            </div>
          </div>

          {f.type === "file" && (
            <div>
              <Label className="text-xs font-body">Accepted file types</Label>
              <Input
                value={f.accept || ""}
                onChange={(e) => update(idx, { accept: e.target.value })}
                placeholder=".pdf,.doc,.docx"
                className="font-body"
              />
            </div>
          )}

          {HAS_OPTIONS.has(f.type) && (
            <div>
              <Label className="text-xs font-body">Options (one per line)</Label>
              <textarea
                value={(f.options || []).join("\n")}
                onChange={(e) =>
                  update(idx, {
                    options: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  })
                }
                rows={3}
                className="w-full font-body text-sm rounded-md border border-input bg-background px-3 py-2"
                placeholder="Option 1&#10;Option 2"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Switch
              checked={!!f.required}
              onCheckedChange={(c) => update(idx, { required: c })}
              id={`req-${f.id}`}
            />
            <Label htmlFor={`req-${f.id}`} className="text-xs font-body cursor-pointer">Required</Label>
          </div>
        </div>
      ))}
    </div>
  );
}
