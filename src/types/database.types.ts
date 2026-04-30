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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      area_asuransi_kendaraan: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          name: string
          tiering: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name: string
          tiering: number
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name?: string
          tiering?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      area_branch_grouping: {
        Row: {
          area_asuransi_kendaraan_id: string
          area_taf_id: string
          area_tam_id: string
          branch_id: string
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          updated_at: string
          updated_by: string
        }
        Insert: {
          area_asuransi_kendaraan_id: string
          area_taf_id: string
          area_tam_id: string
          branch_id: string
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          updated_at: string
          updated_by: string
        }
        Update: {
          area_asuransi_kendaraan_id?: string
          area_taf_id?: string
          area_tam_id?: string
          branch_id?: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "area_branch_grouping_area_asuransi_kendaraan_id_fkey"
            columns: ["area_asuransi_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "area_asuransi_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_area_taf_id_fkey"
            columns: ["area_taf_id"]
            isOneToOne: false
            referencedRelation: "area_taf"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_area_tam_id_fkey"
            columns: ["area_tam_id"]
            isOneToOne: false
            referencedRelation: "area_tam"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
        ]
      }
      area_taf: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          name: string
          tiering: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name: string
          tiering?: number | null
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name?: string
          tiering?: number | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      area_tam: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          name: string
          tiering: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name: string
          tiering?: number | null
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name?: string
          tiering?: number | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      asuransi_kendaraan: {
        Row: {
          additional_tjh: number
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          group: string | null
          id: string
          is_bundlerfe: boolean
          is_enable: boolean
          is_padriver: boolean
          is_pai: boolean
          is_ts: boolean
          name: string
          pa_passenger: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          additional_tjh?: number
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          group?: string | null
          id?: string
          is_bundlerfe?: boolean
          is_enable?: boolean
          is_padriver?: boolean
          is_pai?: boolean
          is_ts?: boolean
          name: string
          pa_passenger?: number
          updated_at: string
          updated_by: string
        }
        Update: {
          additional_tjh?: number
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          group?: string | null
          id?: string
          is_bundlerfe?: boolean
          is_enable?: boolean
          is_padriver?: boolean
          is_pai?: boolean
          is_ts?: boolean
          name?: string
          pa_passenger?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      asuransi_kendaraan_area_premi_coverage_setting: {
        Row: {
          area_asuransi_kendaraan_id: string
          asuransi_kendaraan_coverage_id: string
          asuransi_kendaraan_id: string
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          percent_premi_compre: number | null
          percent_premi_tlo: number | null
          percent_rfe_compre: number | null
          percent_rfe_tlo: number | null
          percent_ts_compre: number | null
          percent_ts_tlo: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          area_asuransi_kendaraan_id: string
          asuransi_kendaraan_coverage_id: string
          asuransi_kendaraan_id: string
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          percent_premi_compre?: number | null
          percent_premi_tlo?: number | null
          percent_rfe_compre?: number | null
          percent_rfe_tlo?: number | null
          percent_ts_compre?: number | null
          percent_ts_tlo?: number | null
          updated_at?: string
          updated_by: string
        }
        Update: {
          area_asuransi_kendaraan_id?: string
          asuransi_kendaraan_coverage_id?: string
          asuransi_kendaraan_id?: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          percent_premi_compre?: number | null
          percent_premi_tlo?: number | null
          percent_rfe_compre?: number | null
          percent_rfe_tlo?: number | null
          percent_ts_compre?: number | null
          percent_ts_tlo?: number | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "asuransi_kendaraan_area_premi_asuransi_kendaraan_coverage__fkey"
            columns: ["asuransi_kendaraan_coverage_id"]
            isOneToOne: false
            referencedRelation: "asuransi_kendaraan_coverage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asuransi_kendaraan_area_premi_c_area_asuransi_kendaraan_id_fkey"
            columns: ["area_asuransi_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "area_asuransi_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asuransi_kendaraan_area_premi_covera_asuransi_kendaraan_id_fkey"
            columns: ["asuransi_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "asuransi_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      asuransi_kendaraan_coverage: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          end_coverage: number
          id: string
          name: string
          start_coverage: number
          tiering: number
          updated_at: string
          updated_by: string
          vehicle_type: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          end_coverage: number
          id?: string
          name: string
          start_coverage: number
          tiering?: number
          updated_at?: string
          updated_by: string
          vehicle_type: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          end_coverage?: number
          id?: string
          name?: string
          start_coverage?: number
          tiering?: number
          updated_at?: string
          updated_by?: string
          vehicle_type?: string
        }
        Relationships: []
      }
      asuransi_kendaraan_depresiasi_setting: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          percent_tsi: number
          tenor: number
          type: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          percent_tsi: number
          tenor: number
          type: string
          updated_at?: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          percent_tsi?: number
          tenor?: number
          type?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      asuransi_kendaraan_pa_setting: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          limit_coverage: number
          pa_driver_rate: number
          pa_passenger_rate: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          limit_coverage: number
          pa_driver_rate: number
          pa_passenger_rate: number
          updated_at?: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          limit_coverage?: number
          pa_driver_rate?: number
          pa_passenger_rate?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      asuransi_kendaraan_rule_dealer: {
        Row: {
          asuransi_kendaraan_id: string
          created_at: string
          created_by: string | null
          dealer_id: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          asuransi_kendaraan_id: string
          created_at?: string
          created_by?: string | null
          dealer_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          asuransi_kendaraan_id?: string
          created_at?: string
          created_by?: string | null
          dealer_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asuransi_kendaraan_rule_dealer_asuransi_kendaraan_id_fkey"
            columns: ["asuransi_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "asuransi_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asuransi_kendaraan_rule_dealer_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealer"
            referencedColumns: ["id"]
          },
        ]
      }
      asuransi_kendaraan_rule_jenis_kendaraan: {
        Row: {
          asuransi_kendaraan_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          jenis_kendaraan_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          asuransi_kendaraan_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          jenis_kendaraan_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          asuransi_kendaraan_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          jenis_kendaraan_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asuransi_kendaraan_rule_jenis_kendar_asuransi_kendaraan_id_fkey"
            columns: ["asuransi_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "asuransi_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asuransi_kendaraan_rule_jenis_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asuransi_kendaraan_rule_jenis_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan_view"
            referencedColumns: ["id"]
          },
        ]
      }
      asuransi_kendaraan_tjh_setting: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          tipe_asuransi: string
          tjh_amount: number
          tjh_value: number
          type: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          tipe_asuransi: string
          tjh_amount: number
          tjh_value: number
          type: string
          updated_at?: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          tipe_asuransi?: string
          tjh_amount?: number
          tjh_value?: number
          type?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      branch: {
        Row: {
          address: string | null
          created_at: string
          created_by: string
          custom_provisi: number | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          name: string
          pic: string | null
          tiering: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by: string
          custom_provisi?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name: string
          pic?: string | null
          tiering: number
          updated_at: string
          updated_by: string
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string
          custom_provisi?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name?: string
          pic?: string | null
          tiering?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      branch_dealer_mapping: {
        Row: {
          branch_id: string
          created_at: string
          created_by: string
          dealer_id: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          updated_at: string
          updated_by: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          created_by: string
          dealer_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          updated_at: string
          updated_by: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          created_by?: string
          dealer_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "branch_dealer_mapping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_dealer_mapping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
          {
            foreignKeyName: "branch_dealer_mapping_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealer"
            referencedColumns: ["id"]
          },
        ]
      }
      dealer: {
        Row: {
          address: string | null
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          name: string
          pic: string | null
          tipe_dealer: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name: string
          pic?: string | null
          tipe_dealer?: string
          updated_at: string
          updated_by: string
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name?: string
          pic?: string | null
          tipe_dealer?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      dealer_tipe_kendaraan_setting: {
        Row: {
          aksesoris: number
          biaya_lain: number
          created_at: string
          created_by: string
          dealer_id: string
          deleted_at: string | null
          deleted_by: string | null
          diskon_otr: number
          id: string
          is_enable: boolean
          otr: number
          paket_servis: number
          tipe_kendaraan_id: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          aksesoris?: number
          biaya_lain?: number
          created_at?: string
          created_by: string
          dealer_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          diskon_otr?: number
          id?: string
          is_enable?: boolean
          otr?: number
          paket_servis?: number
          tipe_kendaraan_id: string
          updated_at: string
          updated_by: string
        }
        Update: {
          aksesoris?: number
          biaya_lain?: number
          created_at?: string
          created_by?: string
          dealer_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          diskon_otr?: number
          id?: string
          is_enable?: boolean
          otr?: number
          paket_servis?: number
          tipe_kendaraan_id?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "dealer_tipe_kendaraan_setting_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dealer_tipe_kendaraan_setting_tipe_kendaraan_id_fkey"
            columns: ["tipe_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "tipe_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dealer_tipe_kendaraan_setting_tipe_kendaraan_id_fkey"
            columns: ["tipe_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "tipe_kendaraan_view"
            referencedColumns: ["id"]
          },
        ]
      }
      jenis_kendaraan: {
        Row: {
          category: string
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          merk_kendaraan_id: string
          name: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          merk_kendaraan_id: string
          name: string
          updated_at: string
          updated_by: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          merk_kendaraan_id?: string
          name?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "jenis_kendaraan_merk_kendaraan_id_fkey"
            columns: ["merk_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "merk_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      life_insurance: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          name: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      life_insurance_paket_mapping: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          life_insurance_id: string
          paket_id: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          life_insurance_id: string
          paket_id: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          life_insurance_id?: string
          paket_id?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "life_insurance_paket_mapping_life_insurance_id_fkey"
            columns: ["life_insurance_id"]
            isOneToOne: false
            referencedRelation: "life_insurance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "life_insurance_paket_mapping_life_insurance_id_fkey"
            columns: ["life_insurance_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["life_insurance_id"]
          },
          {
            foreignKeyName: "life_insurance_paket_mapping_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "life_insurance_paket_mapping_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "life_insurance_paket_mapping_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
        ]
      }
      life_insurance_paket_premi: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          life_insurance_paket_id: string
          percent_premi: number
          tenor: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          life_insurance_paket_id: string
          percent_premi: number
          tenor: number
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          life_insurance_paket_id?: string
          percent_premi?: number
          tenor?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "life_insurance_paket_premi_mapping_life_insurance_paket_id_fkey"
            columns: ["life_insurance_paket_id"]
            isOneToOne: false
            referencedRelation: "life_insurance_paket_mapping"
            referencedColumns: ["id"]
          },
        ]
      }
      life_insurance_paket_setting: {
        Row: {
          affinity: number | null
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          garda_healthtech: number | null
          id: string
          is_enable: boolean
          jumlah_tertanggung: number | null
          life_insurance_paket_id: string
          prepaid_onloan: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          affinity?: number | null
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          garda_healthtech?: number | null
          id?: string
          is_enable?: boolean
          jumlah_tertanggung?: number | null
          life_insurance_paket_id: string
          prepaid_onloan?: string
          updated_at: string
          updated_by: string
        }
        Update: {
          affinity?: number | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          garda_healthtech?: number | null
          id?: string
          is_enable?: boolean
          jumlah_tertanggung?: number | null
          life_insurance_paket_id?: string
          prepaid_onloan?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "life_insurance_paket_setting_life_insurance_paket_id_fkey"
            columns: ["life_insurance_paket_id"]
            isOneToOne: false
            referencedRelation: "life_insurance_paket_mapping"
            referencedColumns: ["id"]
          },
        ]
      }
      life_insurance_premi: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          life_insurance_id: string
          percent_premi: number
          tenor: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          life_insurance_id: string
          percent_premi: number
          tenor: number
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          life_insurance_id?: string
          percent_premi?: number
          tenor?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "life_insurance_default_premi_mapping_life_insurance_id_fkey"
            columns: ["life_insurance_id"]
            isOneToOne: false
            referencedRelation: "life_insurance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "life_insurance_default_premi_mapping_life_insurance_id_fkey"
            columns: ["life_insurance_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["life_insurance_id"]
          },
        ]
      }
      life_insurance_setting: {
        Row: {
          affinity: number
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          garda_healthtech: number
          id: string
          is_enable: boolean
          jumlah_tertanggung: number
          life_insurance_id: string
          prepaid_onloan: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          affinity?: number
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          garda_healthtech?: number
          id?: string
          is_enable?: boolean
          jumlah_tertanggung?: number
          life_insurance_id: string
          prepaid_onloan?: string
          updated_at: string
          updated_by: string
        }
        Update: {
          affinity?: number
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          garda_healthtech?: number
          id?: string
          is_enable?: boolean
          jumlah_tertanggung?: number
          life_insurance_id?: string
          prepaid_onloan?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "life_insurance_setting_life_insurance_id_fkey"
            columns: ["life_insurance_id"]
            isOneToOne: false
            referencedRelation: "life_insurance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "life_insurance_setting_life_insurance_id_fkey"
            columns: ["life_insurance_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["life_insurance_id"]
          },
        ]
      }
      merk_kendaraan: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          name: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          name?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      other_fee: {
        Row: {
          branch_dealer_mapping_id: string
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          max_value: number
          min_value: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          branch_dealer_mapping_id: string
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          max_value: number
          min_value: number
          updated_at: string
          updated_by: string
        }
        Update: {
          branch_dealer_mapping_id?: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          max_value?: number
          min_value?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "other_fee_branch_dealer_mapping_id_fkey"
            columns: ["branch_dealer_mapping_id"]
            isOneToOne: false
            referencedRelation: "branch_dealer_mapping"
            referencedColumns: ["id"]
          },
        ]
      }
      paket: {
        Row: {
          confins_name: string | null
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          end_date: string | null
          id: string
          is_enable: boolean
          paket_group: string | null
          paket_name: string
          paket_type: string
          start_date: string | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          confins_name?: string | null
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          end_date?: string | null
          id?: string
          is_enable?: boolean
          paket_group?: string | null
          paket_name: string
          paket_type: string
          start_date?: string | null
          updated_at: string
          updated_by: string
        }
        Update: {
          confins_name?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          end_date?: string | null
          id?: string
          is_enable?: boolean
          paket_group?: string | null
          paket_name?: string
          paket_type?: string
          start_date?: string | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      paket_branch_rate: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_branch_setting_id: string
          paket_dp_id: string
          percent_best_rate: number | null
          percent_selling_rate: number | null
          tenor: number
          tipe_angsuran: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_branch_setting_id: string
          paket_dp_id: string
          percent_best_rate?: number | null
          percent_selling_rate?: number | null
          tenor: number
          tipe_angsuran: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_branch_setting_id?: string
          paket_dp_id?: string
          percent_best_rate?: number | null
          percent_selling_rate?: number | null
          tenor?: number
          tipe_angsuran?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "paket_branch_rate_paket_branch_setting_id_fkey"
            columns: ["paket_branch_setting_id"]
            isOneToOne: false
            referencedRelation: "paket_branch_setting"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_branch_rate_paket_dp_id_fkey"
            columns: ["paket_dp_id"]
            isOneToOne: false
            referencedRelation: "paket_dp"
            referencedColumns: ["id"]
          },
        ]
      }
      paket_branch_setting: {
        Row: {
          branch_id: string
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_id: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id: string
          updated_at: string
          updated_by: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "paket_branch_setting_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_branch_setting_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
          {
            foreignKeyName: "paket_branch_setting_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_branch_setting_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_branch_setting_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
        ]
      }
      paket_branch_tenor_setting: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_branch_setting_id: string
          percent_dic: number | null
          percent_provisi: number | null
          tenor: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_branch_setting_id: string
          percent_dic?: number | null
          percent_provisi?: number | null
          tenor: number
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_branch_setting_id?: string
          percent_dic?: number | null
          percent_provisi?: number | null
          tenor?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "paket_branch_tenor_setting_paket_branch_setting_id_fkey"
            columns: ["paket_branch_setting_id"]
            isOneToOne: false
            referencedRelation: "paket_branch_setting"
            referencedColumns: ["id"]
          },
        ]
      }
      paket_dp: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_id: string
          percent_dp: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id: string
          percent_dp: number
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id?: string
          percent_dp?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "paket_dp_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_dp_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_dp_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
        ]
      }
      paket_rate: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_dp_id: string
          percent_best_rate: number
          percent_selling_rate: number
          tenor: number
          tipe_angsuran: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_dp_id: string
          percent_best_rate: number
          percent_selling_rate: number
          tenor: number
          tipe_angsuran: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_dp_id?: string
          percent_best_rate?: number
          percent_selling_rate?: number
          tenor?: number
          tipe_angsuran?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "paket_rate_paket_dp_id_fkey"
            columns: ["paket_dp_id"]
            isOneToOne: false
            referencedRelation: "paket_dp"
            referencedColumns: ["id"]
          },
        ]
      }
      paket_rule_branch: {
        Row: {
          branch_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          branch_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          branch_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paket_rule_branch_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_rule_branch_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
          {
            foreignKeyName: "paket_rule_branch_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_rule_branch_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_rule_branch_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
        ]
      }
      paket_rule_dealer: {
        Row: {
          created_at: string
          created_by: string | null
          dealer_id: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          dealer_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          dealer_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paket_rule_dealer_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_rule_dealer_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_rule_dealer_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_rule_dealer_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
        ]
      }
      paket_rule_jenis_kendaraan: {
        Row: {
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          jenis_kendaraan_id: string
          paket_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          jenis_kendaraan_id: string
          paket_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          jenis_kendaraan_id?: string
          paket_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paket_rule_jenis_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_rule_jenis_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_rule_jenis_kendaraan_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_rule_jenis_kendaraan_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_rule_jenis_kendaraan_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
        ]
      }
      paket_subsidy_mapping: {
        Row: {
          branch_id: string | null
          created_at: string
          created_by: string | null
          dealer_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          jenis_kendaraan_id: string | null
          paket_subsidy_type_id: string
          subsidy_unit: string
          subsidy_value: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          created_by?: string | null
          dealer_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          jenis_kendaraan_id?: string | null
          paket_subsidy_type_id: string
          subsidy_unit: string
          subsidy_value: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          created_by?: string | null
          dealer_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          jenis_kendaraan_id?: string | null
          paket_subsidy_type_id?: string
          subsidy_unit?: string
          subsidy_value?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paket_subsidy_mapping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_subsidy_mapping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
          {
            foreignKeyName: "paket_subsidy_mapping_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_subsidy_mapping_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_subsidy_mapping_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_subsidy_mapping_paket_subsidy_type_id_fkey"
            columns: ["paket_subsidy_type_id"]
            isOneToOne: false
            referencedRelation: "paket_subsidy_type"
            referencedColumns: ["id"]
          },
        ]
      }
      paket_subsidy_type: {
        Row: {
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          paket_id: string
          subsidy_type_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          paket_id: string
          subsidy_type_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          paket_id?: string
          subsidy_type_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paket_subsidy_type_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_subsidy_type_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_subsidy_type_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_subsidy_type_subsidy_type_id_fkey"
            columns: ["subsidy_type_id"]
            isOneToOne: false
            referencedRelation: "subsidy_type"
            referencedColumns: ["id"]
          },
        ]
      }
      paket_tenor_setting: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          paket_id: string
          percent_dic: number | null
          percent_provisi: number | null
          tenor: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id: string
          percent_dic?: number | null
          percent_provisi?: number | null
          tenor: number
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          paket_id?: string
          percent_dic?: number | null
          percent_provisi?: number | null
          tenor?: number
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "paket_tenor_setting_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "paket"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paket_tenor_setting_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_life_insurance_premi"
            referencedColumns: ["paket_id"]
          },
          {
            foreignKeyName: "paket_tenor_setting_paket_id_fkey"
            columns: ["paket_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["paket_id"]
          },
        ]
      }
      param: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          param_name: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          param_name: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          param_name?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      param_setting: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          param_id: string
          param_value: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          param_id: string
          param_value: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          param_id?: string
          param_value?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "param_setting_param_id_fkey"
            columns: ["param_id"]
            isOneToOne: false
            referencedRelation: "param"
            referencedColumns: ["id"]
          },
        ]
      }
      simulasi_budget: {
        Row: {
          admin_fee: number | null
          angsuran: number
          ap_dealer: number | null
          area: string
          asuransi_jiwa: string
          asuransi_jiwa_prepaid_onloan: string | null
          asuransi_jiwa_tertanggung: number | null
          asuransi_kendaraan: string
          asuransi_kendaraan_prepaid_onloan: string | null
          branch: string
          coverage_pa: number | null
          created_at: string
          created_by: string
          customer_name: string
          dealer: string | null
          deleted_at: string | null
          deleted_by: string | null
          dic: number | null
          diskon_asuransi_kendaraan_ph: number | null
          diskon_asuransi_kendaraan_rate: number | null
          dp: number
          gross_yield: number | null
          id: string
          is_padriver: boolean | null
          is_pai: boolean | null
          is_rfe: boolean | null
          is_ts: boolean | null
          jenis_kendaraan: string
          jenis_penggunaan: string | null
          max_percent_dic: number | null
          max_percent_provisi: number | null
          merk_kendaraan: string
          model_kendaraan: string
          nilai_affinity: number | null
          nilai_asuransi_kendaraan_onloan: number | null
          nilai_asuransi_kendaraan_prepaid: number | null
          nilai_asuransi_kendaraan_total: number
          nilai_bunga: number | null
          nilai_ght: number | null
          nilai_premi_asuransi_jiwa: number | null
          nilai_subsidy: number | null
          other_fee: number | null
          otr: number | null
          pa_passenger: number | null
          paket_confins_name: string | null
          paket_id: string | null
          paket_name: string
          percent_baloon: number | null
          percent_base_rate: number | null
          percent_dic: number | null
          percent_dp: number
          percent_effective_selling_rate_final: number | null
          percent_ltv: number | null
          percent_min_selling_rate: number | null
          percent_premi_asuransi_jiwa: number | null
          percent_provisi: number | null
          percent_selling_rate: number | null
          percent_selling_rate_efektif: number | null
          percent_selling_rate_final: number | null
          percent_tac: number | null
          polis_asuransi: number | null
          provisi: number | null
          subsidy_ap_to_rate: number | null
          tdp: number
          tenor: number
          tipe_angsuran: string | null
          tipe_asuransi_kendaraan: string | null
          tipe_depresiasi: string | null
          tipe_pembiayaan: string | null
          tipe_perhitungan: string
          tipe_subsidy: string | null
          tjh_amount: number | null
          total_hutang: number | null
          updated_at: string
          updated_by: string
          vehicle_insurance_simulation: Json[] | null
        }
        Insert: {
          admin_fee?: number | null
          angsuran: number
          ap_dealer?: number | null
          area: string
          asuransi_jiwa: string
          asuransi_jiwa_prepaid_onloan?: string | null
          asuransi_jiwa_tertanggung?: number | null
          asuransi_kendaraan: string
          asuransi_kendaraan_prepaid_onloan?: string | null
          branch: string
          coverage_pa?: number | null
          created_at?: string
          created_by: string
          customer_name: string
          dealer?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          dic?: number | null
          diskon_asuransi_kendaraan_ph?: number | null
          diskon_asuransi_kendaraan_rate?: number | null
          dp: number
          gross_yield?: number | null
          id?: string
          is_padriver?: boolean | null
          is_pai?: boolean | null
          is_rfe?: boolean | null
          is_ts?: boolean | null
          jenis_kendaraan: string
          jenis_penggunaan?: string | null
          max_percent_dic?: number | null
          max_percent_provisi?: number | null
          merk_kendaraan: string
          model_kendaraan: string
          nilai_affinity?: number | null
          nilai_asuransi_kendaraan_onloan?: number | null
          nilai_asuransi_kendaraan_prepaid?: number | null
          nilai_asuransi_kendaraan_total: number
          nilai_bunga?: number | null
          nilai_ght?: number | null
          nilai_premi_asuransi_jiwa?: number | null
          nilai_subsidy?: number | null
          other_fee?: number | null
          otr?: number | null
          pa_passenger?: number | null
          paket_confins_name?: string | null
          paket_id?: string | null
          paket_name: string
          percent_baloon?: number | null
          percent_base_rate?: number | null
          percent_dic?: number | null
          percent_dp: number
          percent_effective_selling_rate_final?: number | null
          percent_ltv?: number | null
          percent_min_selling_rate?: number | null
          percent_premi_asuransi_jiwa?: number | null
          percent_provisi?: number | null
          percent_selling_rate?: number | null
          percent_selling_rate_efektif?: number | null
          percent_selling_rate_final?: number | null
          percent_tac?: number | null
          polis_asuransi?: number | null
          provisi?: number | null
          subsidy_ap_to_rate?: number | null
          tdp: number
          tenor: number
          tipe_angsuran?: string | null
          tipe_asuransi_kendaraan?: string | null
          tipe_depresiasi?: string | null
          tipe_pembiayaan?: string | null
          tipe_perhitungan: string
          tipe_subsidy?: string | null
          tjh_amount?: number | null
          total_hutang?: number | null
          updated_at: string
          updated_by: string
          vehicle_insurance_simulation?: Json[] | null
        }
        Update: {
          admin_fee?: number | null
          angsuran?: number
          ap_dealer?: number | null
          area?: string
          asuransi_jiwa?: string
          asuransi_jiwa_prepaid_onloan?: string | null
          asuransi_jiwa_tertanggung?: number | null
          asuransi_kendaraan?: string
          asuransi_kendaraan_prepaid_onloan?: string | null
          branch?: string
          coverage_pa?: number | null
          created_at?: string
          created_by?: string
          customer_name?: string
          dealer?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          dic?: number | null
          diskon_asuransi_kendaraan_ph?: number | null
          diskon_asuransi_kendaraan_rate?: number | null
          dp?: number
          gross_yield?: number | null
          id?: string
          is_padriver?: boolean | null
          is_pai?: boolean | null
          is_rfe?: boolean | null
          is_ts?: boolean | null
          jenis_kendaraan?: string
          jenis_penggunaan?: string | null
          max_percent_dic?: number | null
          max_percent_provisi?: number | null
          merk_kendaraan?: string
          model_kendaraan?: string
          nilai_affinity?: number | null
          nilai_asuransi_kendaraan_onloan?: number | null
          nilai_asuransi_kendaraan_prepaid?: number | null
          nilai_asuransi_kendaraan_total?: number
          nilai_bunga?: number | null
          nilai_ght?: number | null
          nilai_premi_asuransi_jiwa?: number | null
          nilai_subsidy?: number | null
          other_fee?: number | null
          otr?: number | null
          pa_passenger?: number | null
          paket_confins_name?: string | null
          paket_id?: string | null
          paket_name?: string
          percent_baloon?: number | null
          percent_base_rate?: number | null
          percent_dic?: number | null
          percent_dp?: number
          percent_effective_selling_rate_final?: number | null
          percent_ltv?: number | null
          percent_min_selling_rate?: number | null
          percent_premi_asuransi_jiwa?: number | null
          percent_provisi?: number | null
          percent_selling_rate?: number | null
          percent_selling_rate_efektif?: number | null
          percent_selling_rate_final?: number | null
          percent_tac?: number | null
          polis_asuransi?: number | null
          provisi?: number | null
          subsidy_ap_to_rate?: number | null
          tdp?: number
          tenor?: number
          tipe_angsuran?: string | null
          tipe_asuransi_kendaraan?: string | null
          tipe_depresiasi?: string | null
          tipe_pembiayaan?: string | null
          tipe_perhitungan?: string
          tipe_subsidy?: string | null
          tjh_amount?: number | null
          total_hutang?: number | null
          updated_at?: string
          updated_by?: string
          vehicle_insurance_simulation?: Json[] | null
        }
        Relationships: []
      }
      simulasi_kredit: {
        Row: {
          admin_fee: number | null
          angsuran: number
          area: string
          asuransi_jiwa: string
          asuransi_jiwa_prepaid_onloan: string | null
          asuransi_jiwa_tertanggung: number | null
          asuransi_kendaraan: string
          asuransi_kendaraan_prepaid_onloan: string | null
          branch: string
          coverage_pa: number | null
          created_at: string
          created_by: string
          customer_name: string
          dealer: string | null
          deleted_at: string | null
          deleted_by: string | null
          dic: number | null
          dp: number
          id: string
          is_padriver: boolean | null
          is_pai: boolean | null
          is_rfe: boolean | null
          is_ts: boolean | null
          jenis_kendaraan: string
          jenis_penggunaan: string | null
          merk_kendaraan: string
          model_kendaraan: string
          nilai_affinity: number | null
          nilai_ght: number | null
          other_fee: number | null
          otr: number | null
          pa_passenger: number | null
          paket_confins_name: string | null
          paket_id: string | null
          paket_name: string
          percent_dp: number
          polis_asuransi: number | null
          provisi: number | null
          simulation: Json[] | null
          tdp: number
          tipe_asuransi_kendaraan: string | null
          tipe_depresiasi: string | null
          tipe_pembiayaan: string | null
          tipe_perhitungan: string
          tjh_amount: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          admin_fee?: number | null
          angsuran: number
          area: string
          asuransi_jiwa: string
          asuransi_jiwa_prepaid_onloan?: string | null
          asuransi_jiwa_tertanggung?: number | null
          asuransi_kendaraan: string
          asuransi_kendaraan_prepaid_onloan?: string | null
          branch: string
          coverage_pa?: number | null
          created_at?: string
          created_by: string
          customer_name: string
          dealer?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          dic?: number | null
          dp: number
          id?: string
          is_padriver?: boolean | null
          is_pai?: boolean | null
          is_rfe?: boolean | null
          is_ts?: boolean | null
          jenis_kendaraan: string
          jenis_penggunaan?: string | null
          merk_kendaraan: string
          model_kendaraan: string
          nilai_affinity?: number | null
          nilai_ght?: number | null
          other_fee?: number | null
          otr?: number | null
          pa_passenger?: number | null
          paket_confins_name?: string | null
          paket_id?: string | null
          paket_name: string
          percent_dp: number
          polis_asuransi?: number | null
          provisi?: number | null
          simulation?: Json[] | null
          tdp: number
          tipe_asuransi_kendaraan?: string | null
          tipe_depresiasi?: string | null
          tipe_pembiayaan?: string | null
          tipe_perhitungan: string
          tjh_amount?: number | null
          updated_at: string
          updated_by: string
        }
        Update: {
          admin_fee?: number | null
          angsuran?: number
          area?: string
          asuransi_jiwa?: string
          asuransi_jiwa_prepaid_onloan?: string | null
          asuransi_jiwa_tertanggung?: number | null
          asuransi_kendaraan?: string
          asuransi_kendaraan_prepaid_onloan?: string | null
          branch?: string
          coverage_pa?: number | null
          created_at?: string
          created_by?: string
          customer_name?: string
          dealer?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          dic?: number | null
          dp?: number
          id?: string
          is_padriver?: boolean | null
          is_pai?: boolean | null
          is_rfe?: boolean | null
          is_ts?: boolean | null
          jenis_kendaraan?: string
          jenis_penggunaan?: string | null
          merk_kendaraan?: string
          model_kendaraan?: string
          nilai_affinity?: number | null
          nilai_ght?: number | null
          other_fee?: number | null
          otr?: number | null
          pa_passenger?: number | null
          paket_confins_name?: string | null
          paket_id?: string | null
          paket_name?: string
          percent_dp?: number
          polis_asuransi?: number | null
          provisi?: number | null
          simulation?: Json[] | null
          tdp?: number
          tipe_asuransi_kendaraan?: string | null
          tipe_depresiasi?: string | null
          tipe_pembiayaan?: string | null
          tipe_perhitungan?: string
          tjh_amount?: number | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      subsidy_type: {
        Row: {
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          formula_handler: string
          formula_parameters: Json
          id: string
          is_enable: boolean
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          formula_handler: string
          formula_parameters?: Json
          id?: string
          is_enable?: boolean
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          formula_handler?: string
          formula_parameters?: Json
          id?: string
          is_enable?: boolean
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      tipe_kendaraan: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_enable: boolean
          jenis_kendaraan_id: string
          name: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          jenis_kendaraan_id: string
          name: string
          updated_at: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_enable?: boolean
          jenis_kendaraan_id?: string
          name?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "tipe_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tipe_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan_view"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          branch_id: string | null
          created_at: string | null
          deleted_at: string | null
          device_id: string | null
          email: string
          id: string
          last_sign_in_at: string | null
          name: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar_url?: string | null
          branch_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          device_id?: string | null
          email: string
          id: string
          last_sign_in_at?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar_url?: string | null
          branch_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          device_id?: string | null
          email?: string
          id?: string
          last_sign_in_at?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "users_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
        ]
      }
    }
    Views: {
      apps_dashboard_metrics_average_user: {
        Row: {
          budget_contribution_percent: number | null
          credit_contribution_percent: number | null
          grand_total: number | null
          sales: string | null
          total_budget: number | null
          total_contribution_percent: number | null
          total_credit: number | null
          year: number | null
        }
        Relationships: []
      }
      apps_dashboard_metrics_simulation_budget_user: {
        Row: {
          contribution_percent_per_month: number | null
          month: number | null
          month_name: string | null
          sales: string | null
          total: number | null
          year: number | null
        }
        Relationships: []
      }
      apps_dashboard_metrics_simulation_credit_user: {
        Row: {
          contribution_percent_per_month: number | null
          month: number | null
          month_name: string | null
          sales: string | null
          total: number | null
          year: number | null
        }
        Relationships: []
      }
      branch_grouping_view: {
        Row: {
          area_asuransi_kendaraan_id: string | null
          area_asuransi_kendaraan_name: string | null
          area_taf_id: string | null
          area_taf_name: string | null
          area_tam_id: string | null
          area_tam_name: string | null
          branch_id: string | null
          branch_name: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string | null
          is_enable: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "area_branch_grouping_area_asuransi_kendaraan_id_fkey"
            columns: ["area_asuransi_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "area_asuransi_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_area_taf_id_fkey"
            columns: ["area_taf_id"]
            isOneToOne: false
            referencedRelation: "area_taf"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_area_tam_id_fkey"
            columns: ["area_tam_id"]
            isOneToOne: false
            referencedRelation: "area_tam"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_branch_grouping_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
        ]
      }
      dashboard_metrics_asuransi_jiwa: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_asuransi_jiwa: number | null
          total_asuransi_jiwa: number | null
        }
        Relationships: []
      }
      dashboard_metrics_asuransi_kendaraan: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_asuransi_kendaraan: number | null
          total_asuransi_kendaraan: number | null
        }
        Relationships: []
      }
      dashboard_metrics_branch: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_branch: number | null
          total_branch: number | null
        }
        Relationships: []
      }
      dashboard_metrics_dealer: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_dealer: number | null
          total_dealer: number | null
        }
        Relationships: []
      }
      dashboard_metrics_paket: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_paket: number | null
          total_paket: number | null
        }
        Relationships: []
      }
      dashboard_metrics_simulation_budget: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_simulasi_budget: number | null
          total_simulasi_budget: number | null
        }
        Relationships: []
      }
      dashboard_metrics_simulation_credit: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_simulasi_credit: number | null
          total_simulasi_credit: number | null
        }
        Relationships: []
      }
      dashboard_metrics_users: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_users: number | null
          total_users: number | null
        }
        Relationships: []
      }
      dashboard_metrics_vehicle_model: {
        Row: {
          before_current_month: number | null
          conversion_percent: number | null
          monthly_vehicle_model: number | null
          total_vehicle_model: number | null
        }
        Relationships: []
      }
      dealer_tipe_kendaraan_setting_view: {
        Row: {
          aksesoris: number | null
          biaya_lain: number | null
          created_at: string | null
          created_by: string | null
          dealer_id: string | null
          dealer_name: string | null
          deleted_at: string | null
          deleted_by: string | null
          diskon_otr: number | null
          id: string | null
          is_enable: boolean | null
          jenis_kendaraan_name: string | null
          merk_kendaraan_name: string | null
          otr: number | null
          paket_servis: number | null
          tipe_kendaraan_id: string | null
          tipe_kendaraan_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dealer_tipe_kendaraan_setting_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dealer_tipe_kendaraan_setting_tipe_kendaraan_id_fkey"
            columns: ["tipe_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "tipe_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dealer_tipe_kendaraan_setting_tipe_kendaraan_id_fkey"
            columns: ["tipe_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "tipe_kendaraan_view"
            referencedColumns: ["id"]
          },
        ]
      }
      jenis_kendaraan_view: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string | null
          is_enable: boolean | null
          merk_kendaraan: string | null
          merk_kendaraan_id: string | null
          name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jenis_kendaraan_merk_kendaraan_id_fkey"
            columns: ["merk_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "merk_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      other_fee_view: {
        Row: {
          branch_dealer_mapping_id: string | null
          branch_name: string | null
          created_at: string | null
          created_by: string | null
          dealer_name: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string | null
          max_value: number | null
          min_value: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "other_fee_branch_dealer_mapping_id_fkey"
            columns: ["branch_dealer_mapping_id"]
            isOneToOne: false
            referencedRelation: "branch_dealer_mapping"
            referencedColumns: ["id"]
          },
        ]
      }
      param_setting_view: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string | null
          param_id: string | null
          param_name: string | null
          param_value: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "param_setting_param_id_fkey"
            columns: ["param_id"]
            isOneToOne: false
            referencedRelation: "param"
            referencedColumns: ["id"]
          },
        ]
      }
      tipe_kendaraan_view: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string | null
          is_enable: boolean | null
          jenis_kendaraan: string | null
          jenis_kendaraan_id: string | null
          kategori_kendaraan: string | null
          merk_kendaraan: string | null
          name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tipe_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tipe_kendaraan_jenis_kendaraan_id_fkey"
            columns: ["jenis_kendaraan_id"]
            isOneToOne: false
            referencedRelation: "jenis_kendaraan_view"
            referencedColumns: ["id"]
          },
        ]
      }
      users_view: {
        Row: {
          avatar_url: string | null
          branch_id: string | null
          branch_name: string | null
          created_at: string | null
          device_id: string | null
          email: string | null
          id: string | null
          last_sign_in_at: string | null
          name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      users_view_full: {
        Row: {
          avatar_url: string | null
          branch_id: string | null
          branch_name: string | null
          created_at: string | null
          device_id: string | null
          email: string | null
          id: string | null
          last_sign_in_at: string | null
          name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
        ]
      }
      users_view_limited: {
        Row: {
          avatar_url: string | null
          branch_id: string | null
          branch_name: string | null
          created_at: string | null
          device_id: string | null
          email: string | null
          id: string | null
          last_sign_in_at: string | null
          name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "v_paket_rate"
            referencedColumns: ["branch_id"]
          },
        ]
      }
      v_life_insurance_premi: {
        Row: {
          affinity: number | null
          garda_healthtech: number | null
          is_premi_overridden: boolean | null
          is_setting_overridden: boolean | null
          jumlah_tertanggung: number | null
          life_insurance_id: string | null
          life_insurance_name: string | null
          mapping_is_enable: boolean | null
          paket_id: string | null
          paket_name: string | null
          percent_premi: number | null
          prepaid_onloan: string | null
          setting_is_enable: boolean | null
          tenor: number | null
        }
        Relationships: []
      }
      v_paket_rate: {
        Row: {
          branch_id: string | null
          branch_name: string | null
          is_rate_overridden: boolean | null
          is_tenor_overridden: boolean | null
          paket_id: string | null
          paket_name: string | null
          percent_best_rate: number | null
          percent_dic: number | null
          percent_dp: number | null
          percent_provisi: number | null
          percent_selling_rate: number | null
          tenor: number | null
          tipe_angsuran: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_user_role: { Args: { user_id: string }; Returns: string }
      clone_paket: {
        Args: { new_paket_name: string; source_paket_id: string }
        Returns: string
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      is_admin_or_super: { Args: never; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      user_role: "super_admin" | "admin" | "user"
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
      user_role: ["super_admin", "admin", "user"],
    },
  },
} as const
