export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      candidate_pipeline: {
        Row: {
          application_id: string
          assignment_due_at: string | null
          calendly_event_url: string | null
          created_at: string
          id: string
          meeting_scheduled_at: string | null
          notes: string | null
          stage: Database["public"]["Enums"]["pipeline_stage"]
          submission_payload: Json | null
          submission_token: string | null
          updated_at: string
        }
        Insert: {
          application_id: string
          assignment_due_at?: string | null
          calendly_event_url?: string | null
          created_at?: string
          id?: string
          meeting_scheduled_at?: string | null
          notes?: string | null
          stage?: Database["public"]["Enums"]["pipeline_stage"]
          submission_payload?: Json | null
          submission_token?: string | null
          updated_at?: string
        }
        Update: {
          application_id?: string
          assignment_due_at?: string | null
          calendly_event_url?: string | null
          created_at?: string
          id?: string
          meeting_scheduled_at?: string | null
          notes?: string | null
          stage?: Database["public"]["Enums"]["pipeline_stage"]
          submission_payload?: Json | null
          submission_token?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_pipeline_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          created_at: string
          data: Json
          form_type: string
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: Json
          form_type: string
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          form_type?: string
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_email: string | null
          applicant_name: string | null
          created_at: string
          cv_path: string | null
          id: string
          job_id: string
          responses: Json
          status: string
          updated_at: string
        }
        Insert: {
          applicant_email?: string | null
          applicant_name?: string | null
          created_at?: string
          cv_path?: string | null
          id?: string
          job_id: string
          responses?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_email?: string | null
          applicant_name?: string | null
          created_at?: string
          cv_path?: string | null
          id?: string
          job_id?: string
          responses?: Json
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          assignment_duration_hours: number | null
          assignment_instructions: string | null
          assignment_link: string | null
          assignment_pdf_path: string | null
          calendly_url: string | null
          category: string
          created_at: string
          department: string | null
          description: Json
          employment_type: string | null
          form_schema: Json
          id: string
          is_published: boolean
          location: string | null
          pipeline_enabled: boolean
          short_description: string | null
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          assignment_duration_hours?: number | null
          assignment_instructions?: string | null
          assignment_link?: string | null
          assignment_pdf_path?: string | null
          calendly_url?: string | null
          category: string
          created_at?: string
          department?: string | null
          description?: Json
          employment_type?: string | null
          form_schema?: Json
          id?: string
          is_published?: boolean
          location?: string | null
          pipeline_enabled?: boolean
          short_description?: string | null
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          assignment_duration_hours?: number | null
          assignment_instructions?: string | null
          assignment_link?: string | null
          assignment_pdf_path?: string | null
          calendly_url?: string | null
          category?: string
          created_at?: string
          department?: string | null
          description?: Json
          employment_type?: string | null
          form_schema?: Json
          id?: string
          is_published?: boolean
          location?: string | null
          pipeline_enabled?: boolean
          short_description?: string | null
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          path: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      pipeline_email_log: {
        Row: {
          application_id: string | null
          error: string | null
          id: string
          recipient: string
          sent_at: string
          status: string
          subject: string | null
          template_key: string
        }
        Insert: {
          application_id?: string | null
          error?: string | null
          id?: string
          recipient: string
          sent_at?: string
          status?: string
          subject?: string | null
          template_key: string
        }
        Update: {
          application_id?: string | null
          error?: string | null
          id?: string
          recipient?: string
          sent_at?: string
          status?: string
          subject?: string | null
          template_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_email_log_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_email_templates: {
        Row: {
          body_html: string
          created_at: string
          delay_minutes: number
          from_name: string
          id: string
          is_active: boolean
          key: string
          name: string
          subject: string
          updated_at: string
        }
        Insert: {
          body_html: string
          created_at?: string
          delay_minutes?: number
          from_name?: string
          id?: string
          is_active?: boolean
          key: string
          name: string
          subject: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          created_at?: string
          delay_minutes?: number
          from_name?: string
          id?: string
          is_active?: boolean
          key?: string
          name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      pipeline_scheduled_emails: {
        Row: {
          application_id: string
          attempts: number
          created_at: string
          id: string
          last_error: string | null
          send_at: string
          sent_at: string | null
          status: string
          template_key: string
        }
        Insert: {
          application_id: string
          attempts?: number
          created_at?: string
          id?: string
          last_error?: string | null
          send_at: string
          sent_at?: string | null
          status?: string
          template_key: string
        }
        Update: {
          application_id?: string
          attempts?: number
          created_at?: string
          id?: string
          last_error?: string | null
          send_at?: string
          sent_at?: string | null
          status?: string
          template_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_scheduled_emails_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_settings: {
        Row: {
          assignment_duration_hours: number
          assignment_link: string | null
          brand_logo_url: string | null
          brand_primary_color: string | null
          brand_signature_html: string | null
          calendly_url: string | null
          id: number
          notification_email: string
          reminder_offsets_hours: number[]
          updated_at: string
        }
        Insert: {
          assignment_duration_hours?: number
          assignment_link?: string | null
          brand_logo_url?: string | null
          brand_primary_color?: string | null
          brand_signature_html?: string | null
          calendly_url?: string | null
          id?: number
          notification_email?: string
          reminder_offsets_hours?: number[]
          updated_at?: string
        }
        Update: {
          assignment_duration_hours?: number
          assignment_link?: string | null
          brand_logo_url?: string | null
          brand_primary_color?: string | null
          brand_signature_html?: string | null
          calendly_url?: string | null
          id?: number
          notification_email?: string
          reminder_offsets_hours?: number[]
          updated_at?: string
        }
        Relationships: []
      }
      popup_events: {
        Row: {
          ab_bucket: string | null
          created_at: string
          event_type: string
          id: string
          intent: string
          path: string
          referrer: string | null
          variant: string
        }
        Insert: {
          ab_bucket?: string | null
          created_at?: string
          event_type: string
          id?: string
          intent: string
          path: string
          referrer?: string | null
          variant: string
        }
        Update: {
          ab_bucket?: string | null
          created_at?: string
          event_type?: string
          id?: string
          intent?: string
          path?: string
          referrer?: string | null
          variant?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
      pipeline_stage:
        | "applied"
        | "assignment_sent"
        | "assignment_submitted"
        | "meeting_scheduled"
        | "completed"
        | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      pipeline_stage: [
        "applied",
        "assignment_sent",
        "assignment_submitted",
        "meeting_scheduled",
        "completed",
        "rejected",
      ],
    },
  },
} as const
