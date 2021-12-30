import React, { Component } from 'react'
// import CampaignGraph from './campaign_graph'
import _ from 'lodash'
import CampaignReactOrgChart from "./campaign_react_org_chart";

let data = {
  "enable_campaign?": {
    "description": "Enable this rule to enable initial_outreach campaign.",
    "label": "Enable campaign?",
    "yes": "enter_mortgage_rules",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "reject",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "enter_mortgage_rules": {
    "description": "Disable me to skip this rules set.",
    "label": "Enter mortgage rules",
    "yes": "lead_type_is_mortgage?",
    "no": "mortgage_rules_pass",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "mortgage_rules_pass",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "lead_type_is_mortgage?": {
    "description": "Check whether the lead type is mortgage or not.",
    "label": "Lead type is mortgage?",
    "yes": "delay_mortgage_lead_queuing?",
    "no": "mortgage_rules_pass",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "mortgage_rules_pass",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "delay_mortgage_lead_queuing?": {
    "description": "Check whether the queuing of mortgage lead should be delayed.",
    "label": "Delay mortgage lead queuing?",
    "yes": "delay_mortgage_lead_queuing!",
    "no": "clicked_mortgage_result?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "clicked_mortgage_result?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "delay_mortgage_lead_queuing!": {
    "description": "Delay the queuing of mortgage lead.",
    "label": "Delay mortgage lead queuing!",
    "yes": "exit",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "exit",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "clicked_mortgage_result?": {
    "description": "Check whether the customer clicked mortgage result listing or not",
    "label": "Clicked mortgage result?",
    "yes": "reject",
    "no": "valid_ebureau_credit_score?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "valid_ebureau_credit_score?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "valid_ebureau_credit_score?": {
    "description": "Validate ebureau credit score of lead against some threshold value.",
    "label": "Valid ebureau credit score?",
    "yes": "eligible_state_for_mortgage?",
    "no": "valid_credit_rating?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "valid_credit_rating?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "valid_credit_rating?": {
    "description": "Validate credit rating of lead against some threshold value.",
    "label": "Valid credit rating?",
    "yes": "eligible_state_for_mortgage?",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "eligible_state_for_mortgage?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "eligible_state_for_mortgage?": {
    "description": "Validate state of lead against eligible states for mortgage.",
    "label": "Eligible state for mortgage?",
    "yes": "dialing_eligible_loan_amount?",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "dial_states_for_mortgage": {
        "name": "dial_states_for_mortgage",
        "type": "string_array",
        "default": [
          "AZ",
          "CO",
          "CT",
          "FL",
          "MI",
          "NJ",
          "OK",
          "OR",
          "TN",
          "TX",
          "WA",
          "WV"
        ]
      }
    },
    "default_child_rule": "dialing_eligible_loan_amount?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "dialing_eligible_loan_amount?": {
    "description": "Validate the loan asked by customer against some threshold value.",
    "label": "Dialing eligible loan amount?",
    "yes": "mortgage_rules_pass",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "mortgage_rules_pass",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "mortgage_rules_pass": {
    "description": "Called when MortgageRules complete",
    "label": "Mortgage rules pass",
    "yes": "allowed_utm_source_for_auto_leads?",
    "no": "exit",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "allowed_utm_source_for_auto_leads?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "allowed_utm_source_for_auto_leads?": {
    "description": "Do not queue lead if it has certain utm sources",
    "label": "Allowed utm source for auto leads?",
    "yes": "already_in_initial_outreach?",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "queuing_restricted_utm_source": {
        "name": "queuing_restricted_utm_source",
        "type": "string_array",
        "default": [
          "autodm01"
        ]
      }
    },
    "default_child_rule": "already_in_initial_outreach?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "already_in_initial_outreach?": {
    "description": "Does the lead already have an existing initial_outreach campaign?",
    "label": "Already in initial outreach?",
    "yes": "expiry_disposition?",
    "no": "is_digital_only_flow_lead?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "is_digital_only_flow_lead?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "expiry_disposition?": {
    "description": "We only requeue to this campaign if the lead was not expired from the Delta Queue.",
    "label": "Expiry disposition?",
    "yes": "reject",
    "no": "requeue_disposition?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "expiry_dispositions": {
        "name": "expiry_dispositions",
        "type": "integer_array",
        "default": [
          -1001
        ]
      }
    },
    "default_child_rule": "requeue_disposition?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "requeue_disposition?": {
    "description": "We only requeue to this campaign if the last \"campaign\" call disposition was\n            one of these.",
    "label": "Requeue disposition?",
    "yes": "requeue_in_24_hours_disposition?",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "requeue_dispositions": {
        "name": "requeue_dispositions",
        "type": "integer_array",
        "default": [
          "-20",
          "-19",
          "3788",
          "-32",
          "-24",
          "-15",
          "-16",
          "-55",
          "-22",
          "-57",
          "-33",
          "-37",
          "-82",
          "0",
          "-36",
          "-14",
          "5951",
          "-84",
          "-56",
          "-57",
          "7559",
          "-83",
          "-18",
          "-17",
          "7067",
          "7068",
          "7069",
          "7070",
          "5951",
          "-38",
          "3787"
        ]
      }
    },
    "default_child_rule": "requeue_in_24_hours_disposition?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "requeue_in_24_hours_disposition?": {
    "description": "Was the last disposition a \"call back in 24 hours\" disposition?",
    "label": "Requeue in 24 hours disposition?",
    "yes": "queue_in_24_hours!",
    "no": "requeue_in_one_minute_disposition?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "queue_24_hours_dispositions": {
        "name": "queue_24_hours_dispositions",
        "type": "integer_array",
        "default": [
          3787
        ]
      }
    },
    "default_child_rule": "requeue_in_one_minute_disposition?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "requeue_in_one_minute_disposition?": {
    "description": "Was the last disposition a \"call back in one minute\" disposition?",
    "label": "Requeue in one minute disposition?",
    "yes": "queue_in_one_minute!",
    "no": "reached_max_queuings?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "queue_in_one_minute_dispositions": {
        "name": "queue_in_one_minute_dispositions",
        "type": "integer_array",
        "default": [
          -38
        ]
      }
    },
    "default_child_rule": "reached_max_queuings?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "reached_max_queuings?": {
    "description": "Has the lead reached or exceeded the maximum number of queuings for this\n            campaign? System lead config is used regardless of LOI when the lead is organic or an\n            A.com lead.",
    "label": "Reached max queuings?",
    "yes": "reject",
    "no": "is_digital_only_flow_lead?",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "system_lead_max_queuings": {
        "name": "system_lead_max_queuings",
        "type": "integer",
        "default": 2
      },
      "health_max_queuings": {
        "name": "health_max_queuings",
        "type": "integer",
        "default": 4
      },
      "medicare_max_queuings": {
        "name": "medicare_max_queuings",
        "type": "integer",
        "default": 4
      },
      "life_max_queuings": {
        "name": "life_max_queuings",
        "type": "integer",
        "default": 4
      },
      "auto_max_queuings": {
        "name": "auto_max_queuings",
        "type": "integer",
        "default": 4
      },
      "motorcycle_max_queuings": {
        "name": "motorcycle_max_queuings",
        "type": "integer",
        "default": 4
      },
      "home_max_queuings": {
        "name": "home_max_queuings",
        "type": "integer",
        "default": 4
      },
      "pet_max_queuings": {
        "name": "pet_max_queuings",
        "type": "integer",
        "default": 4
      },
      "mortgage_max_queuings": {
        "name": "mortgage_max_queuings",
        "type": "integer",
        "default": 4
      },
      "pf_max_queuings": {
        "name": "pf_max_queuings",
        "type": "integer",
        "default": 4
      },
      "rent_max_queuings": {
        "name": "rent_max_queuings",
        "type": "integer",
        "default": 4
      }
    },
    "default_child_rule": "is_digital_only_flow_lead?",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "queue_in_24_hours!": {
    "description": "queues the lead to initial outreach in 24 hours assuming it passes global\n            eligibility checks.",
    "label": "Queue in 24 hours!",
    "yes": "exit",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "reject",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "queue_in_one_minute!": {
    "description": "queues the lead to initial outreach in one minute assuming it passes global\n            eligibility checks.",
    "label": "Queue in one minute!",
    "yes": "exit",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "reject",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "is_digital_only_flow_lead?": {
    "description": "Is this lead a digital only flow lead?",
    "label": "Is digital only flow lead?",
    "yes": "queue_to_initial_outreach_digital_only_flow!",
    "no": "queue_to_initial_outreach!",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "queue_to_initial_outreach!",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "queue_to_initial_outreach_digital_only_flow!": {
    "description": "Queue this digital_only_flow lead to initial outreach.",
    "label": "Queue to initial outreach digital only flow!",
    "yes": "exit",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "digital_flow_queue_delay": {
        "name": "digital_flow_queue_delay",
        "type": "integer",
        "default": 1440
      }
    },
    "default_child_rule": "reject",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "queue_to_initial_outreach!": {
    "description": "\n              Queue to the initial_outreach Campaign. Queue delays (min) are used based on the order\n              of the queuing in this campaign, e.g., the third queuing would get the third value\n              in the corresponding queue delay field or the default queue delay if it cant be found.\n             ",
    "label": "Queue to initial outreach!",
    "yes": "exit",
    "no": "reject",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      },
      "default_queue_delay": {
        "name": "default_queue_delay",
        "type": "integer",
        "default": 1440
      },
      "system_lead_queue_delays": {
        "name": "system_lead_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "fresh_dial_mortgage_delays": {
        "name": "fresh_dial_mortgage_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "health_queue_delays": {
        "name": "health_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "medicare_queue_delays": {
        "name": "medicare_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "life_queue_delays": {
        "name": "life_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "auto_queue_delays": {
        "name": "auto_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "motorcycle_queue_delays": {
        "name": "motorcycle_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "home_queue_delays": {
        "name": "home_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "pet_queue_delays": {
        "name": "pet_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "mortgage_queue_delays": {
        "name": "mortgage_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "pf_queue_delays": {
        "name": "pf_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      },
      "rent_queue_delays": {
        "name": "rent_queue_delays",
        "type": "integer_array",
        "default": [

        ]
      }
    },
    "default_child_rule": "reject",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  },
  "reject": {
    "description": "Reject",
    "label": "Reject",
    "yes": "exit",
    "no": "exit",
    "config": {
      "enabled?": {
        "name": "enabled?",
        "type": "boolean",
        "label": "Enabled?",
        "default": false
      },
      "updated_by": {
        "name": "updated_by",
        "is_disabled": true,
        "type": "immutable_string",
        "label": "Updated By",
        "default": "n/a"
      },
      "updated_at": {
        "name": "updated_at",
        "type": "timestamp",
        "label": "Updated At",
        "default": "n/a"
      }
    },
    "default_child_rule": "exit",
    "always_enabled": false,
    "rescheduled_time": null,
    "multiple_switches": false
  }
}

function valueFromProps(props, campaignName, ruleName, fieldName) {
  let { campaignSettings } = props
  return (
      campaignSettings[campaignName] &&
      campaignSettings[campaignName][ruleName] &&
      campaignSettings[campaignName][ruleName][fieldName]
  )
}

function getDefaultValue(field) {
  if (field.default) {
    return field.default
  } else if (field['type'] === 'boolean') {
    return false
  } else {
    throw `No default value found for configuration type ${field.type}`
  }
}

class ShopperCampaignSettings extends Component {
  constructor(props) {
    super(props)
    this.initState(props)
  }

  initState(props) {
    this.state = {}
    _.each(props.schema, (campaign, campaignName) => {
      _.each(campaign['rules'], (rule, ruleName) => {
        _.each(rule.config, (field, fieldName) => {
          let stateKey = [campaignName, ruleName, fieldName].join(':')
          if (!_.hasIn(props.campaignSettings, stateKey)) {
            let value = valueFromProps(props, campaignName, ruleName, fieldName)
            if (value === null || value.length == 0) {
              value = getDefaultValue(field)
            }
            this.state[stateKey] = value
          }
        })
      })
      this.state.current_user = props.current_user
    })
  }

  render() {

    return (
        <React.Fragment>
          {<CampaignReactOrgChart name={"shopper_campaign_setting[campaign_setting]"} campaignConfigHeading={"InitialOutreach"} rules={data} campaignName={"Shopper::Campaign::Campaigns::InitialOutreach"} state={this.state}/>}
        </React.Fragment>
    )
  }
}

export default ShopperCampaignSettings
