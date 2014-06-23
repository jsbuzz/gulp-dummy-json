gulp-dummy-json
===============

Creates dummy test json data from dummy-json templates. It actually requires a JSON with the template and additional enum value sets and dependencies.

In the near future it will accept pure dummy-json templates as well.


Example input
=============

	{
		"name": "UserDocument",
		"template": "{\n    \"last_modified\": {{date}},\n    \"group_id\": {{hash}},\n    \"profile_id\": {{hash}},\n    \"read\": {{boolean}},\n    \"starred\": {{boolean}},\n    \"authored\": {{boolean}},\n    \"confirmed\": {{boolean}},\n    \"hidden\": {{boolean}},\n    \"id\": {{hash}},\n    \"type\": {{UserDocument_type}},\n    \"month\": {{number 1 12}},\n    \"year\": {{number 1900 2020}},\n    \"day\": {{number 1 28}},\n    \"source\": {{word}},\n    \"title\": {{word}},\n    \"revision\": {{word}},\n    \"created\": {{date}},\n    \"abstract\": {{word}},\n    \"identifiers\": {{hash}},\n    \"authors\": [\n            {{#repeat 0 10}}\n            {{Person}}\n            {{/repeat}}\n        ],\n    \"pages\": {{number 10 100}},\n    \"volume\": {{word}},\n    \"issue\": {{word}},\n    \"website\": {{word}},\n    \"publisher\": {{word}},\n    \"city\": {{word}},\n    \"edition\": {{word}},\n    \"institution\": {{word}},\n    \"series\": {{word}},\n    \"chapter\": {{word}},\n    \"editors\": [\n            {{#repeat 0 10}}\n            {{Person}}\n            {{/repeat}}\n        ]\n}",
		"dependencies": [
			"Person"
		],
		"enums": {
			"UserDocument_type": [
				"journal",
				"book",
				"generic",
				"book_section",
				"conference_proceedings",
				"working_paper",
				"report",
				"web_page",
				"thesis",
				"magazine_article",
				"statute",
				"patent",
				"newspaper_article",
				"computer_program",
				"hearing",
				"television_broadcast",
				"encyclopedia_article",
				"case",
				"film",
				"bill"
			]
		}
	}
