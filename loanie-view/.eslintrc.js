module.exports = {
  "extends": "airbnb",
  "env": {
    "browser":true,
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ]}],
    "linebreak-style": 0,
    "jsx-a11y/label-has-for": [ 2, {
        "components": [ "Label" ],
        "required": {
            "some": [ "nesting", "id" ]
        },
        "allowChildren": false,
    }]
  },
}