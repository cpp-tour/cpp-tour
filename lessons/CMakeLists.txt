macro(SUBDIRLIST result curdir)
  file(GLOB children RELATIVE ${curdir} ${curdir}/*)
  set(dirlist "")
  foreach(child ${children})
    if(IS_DIRECTORY ${curdir}/${child})
      list(APPEND dirlist ${child})
    endif()
  endforeach()
  set(${result} ${dirlist})
endmacro()

SUBDIRLIST(subdirs ${CMAKE_CURRENT_SOURCE_DIR})

if(MSVC)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /W4 /std:c++latest")
else()
    set(CMAKE_CXX_STANDARD 17)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -Werror -Wconversion")
endif()

foreach(subdir ${subdirs})
    add_executable(${subdir} ${subdir}/code.cpp)
    target_include_directories(${subdir} PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}/${subdir}")

    # CTests weird naming rules.
    # string(FIND "${subdir}" "-" position)
    # string(SUBSTRING "${subdir}" ${position} -1 test_name)
    # string(REPLACE "-" "" test_name "${test_name}")
    # string(REPLACE "." "" test_name "${test_name}")
    add_test(NAME "${subdir}" COMMAND "${subdir}")
endforeach()


