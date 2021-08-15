---
title: "Tools"
description: "Collection of my Language Learning Tools"
---

<div class="tdbc-section">
    <ul class="tdbc-column-container">
      {%- for page in collections.tools -%}
      <li class="tdbc-card">
        <div class="tdbc-card__content">
          <a href="{{ page.url }}" class="tdbc-card__title">{{ page.data.title }}</a>
          <p>{{ page.data.description }}</p>
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>