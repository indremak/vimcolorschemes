import React, { useRef, useState, useEffect } from "react";

import { SECTIONS, LAYOUTS } from "src/constants";

import { useEventListener } from "src/hooks/useEventListener";

import { Enter, Slash } from "src/components/icons";

import "./index.scss";

const SEARCH_LABELS = {
  DEFAULT: {
    description: "Search. Press / to focus.",
    render: () => <Slash className="search__icon search__icon--short" />,
  },
  FOCUSED: {
    description: "Press Enter to focus out.",
    render: () => <Enter className="search__icon" />,
  },
};

const SearchInput = ({ value, onChange, onFocusChange, isSearchPage }) => {
  const [label, setLabel] = useState(SEARCH_LABELS.DEFAULT);

  const searchInputWrapperRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    if (isSearchPage && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchPage, searchInputRef]);

  useEventListener("keydown", event => {
    if (
      event.target !== searchInputRef.current &&
      event.key === "/" &&
      !!searchInputRef?.current?.focus
    ) {
      event.preventDefault();
      searchInputRef.current.focus();
    }
  });

  return (
    <label
      ref={searchInputWrapperRef}
      className="search"
      data-section={SECTIONS.ACTIONS}
      data-layout={LAYOUTS.LIST}
      tabIndex="0"
      onKeyDown={event => {
        if (event.target !== searchInputWrapperRef.current) return;
        if (event.key === "Enter") {
          searchInputRef.current.focus();
        }
      }}
    >
      <input
        type="text"
        ref={searchInputRef}
        className="search__input"
        id="search-input"
        name="search-input"
        value={value}
        onChange={onChange}
        placeholder="dark, contrast, ..."
        aria-label={label.description}
        onFocus={() => {
          onFocusChange(true);
          setLabel(SEARCH_LABELS.FOCUSED);
        }}
        onBlur={() => {
          onFocusChange(false);
          setLabel(SEARCH_LABELS.DEFAULT);
        }}
        onKeyDown={event => {
          if (["Enter", "Escape"].includes(event.key))
            searchInputWrapperRef.current.focus();
        }}
      />
      <span className="search__icon-wrapper" aria-hidden>
        {label.render()}
      </span>
    </label>
  );
};

export default SearchInput;
