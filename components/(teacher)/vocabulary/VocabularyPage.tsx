"use client";

import VocabularyHeader from "./VocabularyHeader";
import VocabularyLoading from "./VocabularyLoading";
import VocabularySearch from "./VocabularySearch";
import VocabularyStats from "./VocabularyStats";
import VocabularyTable from "./VocabularyTable";
import Pagination from "@/components/ui/Pagination";
import CreateVocabularyModal from "./CreateVocabularyModal";
import { LoadingSpinner } from "@/components/ui/Loading";

import { useVocabulary } from "@/hooks/useVocabulary";

export default function VocabularyPage() {
  const {
    loading,
    words,
    pagination,
    page,
    setPage,
    search,
    setSearch,
    showModal,
    setShowModal,
    form,
    setForm,
    handleCreate,
  } = useVocabulary();

  if (loading) {
    return (
      <LoadingSpinner label="loading" />
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-8">

      <VocabularyHeader onAdd={() =>setShowModal(true)}/>
      <VocabularyStats words={words}/>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="overflow-x-auto rounded-xl bg-white sm:p-2">

          <VocabularySearch
            search={search}
            setSearch={setSearch}
            total={words.length}
          />

          <VocabularyTable
            words={words}
            search={search}
          />

          <Pagination
            page={page}
            totalPages={pagination?.totalPages || 1}
            setPage={setPage}
          />

        </div>

      </div>

      <CreateVocabularyModal
        open={showModal}
        onClose={() =>setShowModal(false)}
        onCreate={handleCreate}
        form={form}
        setForm={setForm}
      />

    </div>
  );
}